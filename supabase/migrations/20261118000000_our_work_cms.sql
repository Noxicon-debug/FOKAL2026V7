alter table public.gallery_categories
  add column if not exists display_order integer not null default 0;

alter table public.gallery_categories enable row level security;
alter table public.gallery_projects enable row level security;
alter table public.gallery_project_media enable row level security;

grant select on public.gallery_categories, public.gallery_projects, public.gallery_project_media to anon, authenticated;
grant insert, update, delete on public.gallery_projects, public.gallery_project_media to authenticated;

drop policy if exists public_read_gallery_categories on public.gallery_categories;
create policy public_read_gallery_categories on public.gallery_categories for select to anon, authenticated
  using (true);

alter table public.gallery_projects
  alter column category_id drop not null,
  add column publication_state text not null default 'draft' check (publication_state in ('draft', 'published')),
  add column status text not null default 'Completed' check (status in ('Completed', 'In Progress', 'Planning')),
  add column progress integer not null default 100 check (progress between 0 and 100),
  add column location text not null default '',
  add column production_role text not null default '',
  add column commissioned_by text not null default '',
  add column video_url text not null default '',
  add column project_link text,
  add column revision integer not null default 0,
  add constraint gallery_publish_requirements check (
    publication_state = 'draft' or (
      category_id is not null and btrim(title) <> '' and
      btrim(coalesce(description, '')) <> '' and btrim(image_url) <> ''
    )
  );

alter table public.gallery_projects alter column order_index set default 100;

create function public.is_gallery_editor() returns boolean
language sql stable set search_path = ''
as $$
  select coalesce((select auth.jwt()) -> 'app_metadata' -> 'gallery_editor' = 'true'::jsonb, false);
$$;

do $$
declare
  resource record;
  action text;
begin
  for resource in select * from (values
    ('gallery_categories', 'categories'),
    ('gallery_projects', 'projects'),
    ('gallery_project_media', 'media')
  ) as resources(table_name, policy_suffix)
  loop
    foreach action in array array['insert', 'update', 'delete']
    loop
      execute format('drop policy if exists %I on public.%I', 'auth_' || action || '_gallery_' || resource.policy_suffix, resource.table_name);
    end loop;
  end loop;
end;
$$;

drop policy if exists public_read_gallery_projects on public.gallery_projects;
create policy gallery_read_projects on public.gallery_projects for select to anon, authenticated
  using (publication_state = 'published' or (select public.is_gallery_editor()));
create policy gallery_editor_projects on public.gallery_projects for all to authenticated
  using ((select public.is_gallery_editor())) with check ((select public.is_gallery_editor()));

drop policy if exists public_read_gallery_media on public.gallery_project_media;
create policy gallery_read_media on public.gallery_project_media for select to anon, authenticated
  using (exists (select 1 from public.gallery_projects p where p.id = project_id));
create policy gallery_editor_media on public.gallery_project_media for all to authenticated
  using ((select public.is_gallery_editor())) with check ((select public.is_gallery_editor()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('our-work', 'our-work', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);

create policy gallery_editor_uploads on storage.objects for insert to authenticated
  with check (bucket_id = 'our-work' and (select public.is_gallery_editor()));
create policy gallery_read_uploads on storage.objects for select to anon, authenticated
  using (bucket_id = 'our-work' and (
    (select public.is_gallery_editor())
    or exists (
      select 1 from public.gallery_projects p
      where p.publication_state = 'published' and p.image_url = 'our-work:' || objects.name
    )
    or exists (
      select 1 from public.gallery_project_media m
      join public.gallery_projects p on p.id = m.project_id
      where p.publication_state = 'published' and m.url = 'our-work:' || objects.name
    )
  ));

create index gallery_cover_reference on public.gallery_projects (image_url) where publication_state = 'published';
create index gallery_media_reference on public.gallery_project_media (url);

-- Save project fields and the ordered media list in one transaction.
create function public.save_gallery_project(project jsonb, assets jsonb) returns integer
language plpgsql security invoker set search_path = ''
as $$
declare
  draft public.gallery_projects := jsonb_populate_record(null::public.gallery_projects, project);
  saved_id integer;
begin
  if not public.is_gallery_editor() then
    raise exception 'Gallery editor access required' using errcode = '42501';
  end if;

  if draft.id is null then
    insert into public.gallery_projects (
      title, category_id, client, year, description, image_url, order_index,
      status, progress, location, production_role, commissioned_by, video_url, publication_state
    ) values (
      draft.title, draft.category_id, draft.client, draft.year, draft.description, draft.image_url, draft.order_index,
      draft.status, draft.progress, draft.location, draft.production_role, draft.commissioned_by, draft.video_url, draft.publication_state
    ) returning id into saved_id;
  else
    update public.gallery_projects p set
      title = draft.title, category_id = draft.category_id, client = draft.client,
      year = draft.year, description = draft.description, image_url = draft.image_url,
      order_index = draft.order_index, status = draft.status, progress = draft.progress,
      location = draft.location, production_role = draft.production_role, commissioned_by = draft.commissioned_by,
      video_url = draft.video_url, publication_state = draft.publication_state, revision = p.revision + 1
    where p.id = draft.id and p.revision = draft.revision
    returning p.id into saved_id;
    if not found then
      raise exception 'This project changed in another session. Reopen it and try again.';
    end if;
  end if;

  delete from public.gallery_project_media where project_id = saved_id;
  insert into public.gallery_project_media (project_id, type, url, thumbnail_url, caption, order_index)
    select saved_id, asset.type, asset.url, asset.thumbnail_url, asset.caption, asset.order_index
    from jsonb_populate_recordset(null::public.gallery_project_media, assets) as asset;

  return saved_id;
end;
$$;
revoke execute on function public.save_gallery_project(jsonb, jsonb) from public, anon;
grant execute on function public.save_gallery_project(jsonb, jsonb) to authenticated;

insert into public.gallery_categories (id, name, icon_name, display_order) values
  ('videography', 'Video Production', 'Video', 1),
  ('photography', 'Photography', 'Camera', 2),
  ('live-streaming', 'Live Streaming', 'Radio', 3),
  ('events', 'Events', 'Calendar', 4),
  ('marketing', 'Marketing', 'Megaphone', 5),
  ('staging-av', 'Staging & AV', 'LayoutGrid', 6)
on conflict (id) do update set name = excluded.name, display_order = excluded.display_order;
update public.gallery_categories set display_order = 100 where id in ('branding', 'content');

-- Preserve the current public portfolio and its ordering. Existing CMS rows remain drafts.
insert into public.gallery_projects (title, category_id, client, year, description, image_url,
  order_index, status, progress, location, production_role, commissioned_by, video_url, project_link, publication_state) values
  ('Guardians of The Tides – 2024', 'videography', 'Eda Davara Marine Sanctuary', '2024', 'This project focused on documenting community-level responses to climate-related challenges, highlighting local resilience, adaptation strategies, and lived experiences. FOKAL Solutions Limited managed the project from concept development through to final delivery, ensuring ethical representation and clarity of messaging. The content was formatted for use across social media, presentations, and stakeholder engagement.', '/media/image-10-768.webp', 1, 'Completed', 100, '', 'Lead Production Company (Concept, Direction, Filming, Editing)', '', 'https://www.youtube.com/watch?v=iM53m4wdALo', '/projects/guardians-of-the-sea', 'published'),
  ('Sea Women of Melanesia', 'videography', 'UNDP Equator Initiative', '2023', 'In 2023, The Sea Women of Melanesia was awarded the UNDP Equator Initiative Prize, and FOKAL Solutions Limited was contracted as the in-country filming partner to capture the stories and work of Sea Women of Melanesia. Fokal Solutions Limited managed the Production and filming of the feature documentary spanning over three days. This video highlighted climate resilience initiatives at the community level, showcasing the role of local leadership and traditional knowledge in adaptation efforts.', '/media/image-11-768.webp', 2, 'Completed', 100, '', 'Director of Photography', 'What Took You So Long?', 'https://www.youtube.com/watch?v=60-lq-OzoWg', null, 'published'),
  ('East Sepik Province Labour Mobility – Cocoa Farming Video – 2024', 'videography', 'East Sepik Provincial Government / Labour Mobility Programme', '2024', 'FOKAL Solutions Limited produced a short-form video for the East Sepik Province Labour Mobility initiative, featuring the Governor of East Sepik Province, Hon. Allan Bird, who explains the different types of cocoa in Papua New Guinea and best-practice cocoa farming methods. The video was designed to convey practical agricultural knowledge through a trusted local voice, supporting sustainable livelihoods and economic resilience. FOKAL Solutions Limited delivered the full production process, with the final content optimised for digital distribution and community-level engagement.', '/media/image-12-768.webp', 3, 'Completed', 100, 'East Sepik Province', 'Lead Production Company (Concept, Filming, Direction, Editing)', '', 'https://www.facebook.com/share/v/1AT98jwtPm/', '/projects/governor-allan-bird-cocoa-training', 'published'),
  ('Bougainville Chocolate Festival – Daily Highlights Video Series – 2025', 'videography', 'Bougainville Tourism / Bougainville Chocolate Festival', '2025', 'FOKAL Solutions Limited produced a series of daily highlight videos for the Bougainville Chocolate Festival in collaboration with Bougainville Tourism. The content captured cocoa-related activities, cultural performances, and community participation, promoting Bougainville as a cocoa-producing region and tourism destination. The production required a rapid turnaround, with daily filming and editing to enable timely digital release. Final outputs were optimised for online and social media platforms, delivering engaging, high-quality visual storytelling.', '/media/image-13-768.webp', 4, 'Completed', 100, 'Bougainville', 'Lead Production Company (Concept, Filming, Direction, Editing)', '', 'https://www.facebook.com/share/v/1CokX46Gqs/', '/projects/bougainville-chocolate-festival-2025', 'published'),
  ('PNGDF Commanders Cup -2026', 'photography', '2RPIR Team', '2026', 'Photography coverage of the 2RPIR team at the 2026 PNGDF Commanders Cup, capturing the action, teamwork and spirit of competition.

Fokal Solutions Limited documented the 2RPIR team through sports photography, bringing the intensity of play and the connection between teammates into focus.

From on-field action to moments of determination and camaraderie, this collection celebrates the people behind the team and preserves their Commanders Cup experience.', '/media/commanders-cup-18-1280.webp', 5, 'Completed', 100, '', 'Photography Coverage', '', '', '/photography', 'published'),
  ('TWM Group – World Environment Day Video – 2025', 'videography', 'TWM Group', '2025', 'FOKAL Solutions Limited produced a video for TWM Group to mark World Environment Day, highlighting their community outreach initiatives promoting cleaner and safer environments. The production captured TWM Group’s engagement with local communities, including clean-up activities, educational outreach, and environmental advocacy. The project required coordinated on-location filming and post-production to create a visually compelling narrative that reinforced TWM Group’s commitment to environmental stewardship. Final outputs were optimised for online platforms and corporate communications.', '/media/image-2-768.webp', 6, 'Completed', 100, '', 'Lead Production Company (Filming, Editing, Final Delivery)', '', '', null, 'published');

insert into public.gallery_project_media (project_id, type, url, caption, order_index)
select p.id, 'image', photo.url, photo.caption, photo.position
from public.gallery_projects p cross join (values
  ('/media/commanders-cup-18-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 18', 0),
  ('/media/commanders-cup-29-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 29', 1),
  ('/media/commanders-cup-4-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 4', 2),
  ('/media/commanders-cup-23-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 23', 3),
  ('/media/commanders-cup-36-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 36', 4),
  ('/media/commanders-cup-33-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 33', 5),
  ('/media/commanders-cup-25-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 25', 6),
  ('/media/commanders-cup-14-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 14', 7),
  ('/media/commanders-cup-20-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 20', 8),
  ('/media/commanders-cup-27-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 27', 9),
  ('/media/commanders-cup-37-1280.webp', '2RPIR team at the PNGDF Commanders Cup 2026 — photograph 37', 10)
) as photo(url, caption, position)
where p.project_link = '/photography' and p.publication_state = 'published';

-- Include the remaining bundled projects for editorial review.
insert into public.gallery_projects (title, category_id, client, year, description, image_url,
  order_index, status, progress, location, production_role, commissioned_by)
select seed.* from (values
  ('Community Event', 'events', 'Save the Children PNG', 'Jul 2026', 'End-to-end production of a community outreach event including stage setup, sound, live coverage and photography for post-event reporting.', '/images/273A1438.JPG', 100, 'Completed', 100, 'Morobe Province', '', ''),
  ('Stage & Lighting Setup', 'staging-av', 'Air Niugini', 'Aug 2026', 'Full stage design, lighting rig and PA system for a corporate awards night attended by 400 guests, with live mixing and playback support.', '/images/273A1356.JPG', 101, 'Completed', 100, 'Port Moresby, NCD', '', ''),
  ('Executive Portrait Series', 'photography', 'Westpac PNG', 'Jul 2026', 'A studio and on-location portrait series for the executive leadership team, delivered as high-resolution retouched images for print and web.', '/images/AG8A4971_fullres.jpg', 102, 'Completed', 100, 'Port Moresby, NCD', '', ''),
  ('Mining Site Documentation', 'photography', 'Newcrest Mining', 'Jun 2026', 'Industrial photography documenting mining operations, safety procedures and community programs across multiple sites over a one-week shoot.', '/images/273A1295.JPG', 103, 'Completed', 100, 'New Ireland Province', '', ''),
  ('Regional Roadshow', 'events', 'ExxonMobil PNG', 'Aug 2026', 'A four-city roadshow with pop-up stage, AV and live streaming at each stop, plus daily highlight reels for social media.', '/images/273A1265.JPG', 104, 'Completed', 100, 'Multiple Provinces', '', ''),
  ('Tourism Promotional Video', 'videography', 'PNG Tourism Promotion Authority', 'Sep 2026', 'A vibrant promotional video showcasing PNG tourism destinations, featuring aerial, cultural and landscape footage set to an original score.', '/images/AG8A4973_fullres.jpg', 105, 'Completed', 100, 'Nationwide', '', ''),
  ('Annual Report Photography', 'photography', 'The World Bank', 'Sep 2026', 'Documentary-style photography for an annual report, covering project sites, beneficiaries and stakeholder meetings across three provinces.', '/images/273A1298.JPG', 106, 'Completed', 100, 'Multiple Provinces', '', ''),
  ('Hydropower Project Film', 'videography', 'JICA Papua New Guinea', 'Oct 2026', 'An ongoing documentary project tracking the construction of a community hydropower scheme, with site visits filmed at key milestones.', '/images/273A1230.JPG', 107, 'In Progress', 65, 'East New Britain', '', ''),
  ('National Sports Broadcast', 'live-streaming', 'PNG Sports Foundation', 'Oct 2026', 'Live multi-camera streaming of a national sports tournament across three weekends, with instant replay and commentary integration.', '/images/6H8A9047.jpg', 108, 'In Progress', 40, 'Port Moresby, NCD', '', ''),
  ('Cultural Festival Coverage', 'events', 'National Cultural Commission', 'Nov 2026', 'Planned coverage of a three-day cultural festival including stage production, live streaming, photography and a post-event documentary short.', '/images/273A1336.JPG', 109, 'Planning', 15, 'Eastern Highlands', '', ''),
  ('Digital Literacy Campaign', 'marketing', 'Australian High Commission', 'Nov 2026', 'A multi-channel campaign promoting digital literacy, including video assets, social content, radio spots and community workshop materials.', '/images/6H8A9050.jpg', 110, 'Planning', 20, 'Nationwide', '', ''),
  ('University Graduation Live', 'live-streaming', 'University of Papua New Guinea', 'Dec 2026', 'Live streaming of graduation ceremonies across two days with multi-camera setup, lower-thirds and on-demand replay for remote families.', '/images/AG8A5146_fullres.jpg', 111, 'Planning', 10, 'Port Moresby, NCD', '', '')
) as seed(title, category_id, client, year, description, image_url, order_index, status, progress, location, production_role, commissioned_by)
where not exists (select 1 from public.gallery_projects p where lower(btrim(p.title)) = lower(btrim(seed.title)));
