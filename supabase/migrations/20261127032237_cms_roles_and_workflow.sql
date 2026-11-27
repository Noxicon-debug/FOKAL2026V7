create table public.cms_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('contributor','editor','administrator')),
  active boolean not null default true
);
alter table public.cms_members enable row level security;
revoke all on public.cms_members from public, anon, authenticated;
grant select, insert, update on public.cms_members to service_role;
insert into public.cms_members(user_id, role)
  select id, 'editor' from auth.users where raw_app_meta_data->'gallery_editor' = 'true'::jsonb;

create function site_private.current_cms_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.cms_members where user_id = (select auth.uid()) and active
$$;
revoke all on function site_private.current_cms_role() from public;
grant usage on schema site_private to anon, authenticated;
grant execute on function site_private.current_cms_role() to anon, authenticated;

create function public.current_cms_role() returns text language sql stable set search_path = '' as $$
  select site_private.current_cms_role()
$$;
create or replace function public.is_gallery_editor() returns boolean language sql stable set search_path = '' as $$
  select public.current_cms_role() is not null
$$;
create function public.can_publish_cms() returns boolean language sql stable set search_path = '' as $$
  select coalesce(public.current_cms_role() in ('editor','administrator'), false)
$$;

create policy gallery_project_insert_guard on public.gallery_projects as restrictive for insert to authenticated
  with check (publication_state = 'draft' or (select public.can_publish_cms()));
create policy gallery_project_update_guard on public.gallery_projects as restrictive for update to authenticated
  using (publication_state = 'draft' or (select public.can_publish_cms()))
  with check (publication_state = 'draft' or (select public.can_publish_cms()));
create policy gallery_project_delete_guard on public.gallery_projects as restrictive for delete to authenticated
  using ((select public.can_publish_cms()));
create policy gallery_media_insert_guard on public.gallery_project_media as restrictive for insert to authenticated
  with check ((select public.can_publish_cms()) or exists (select 1 from public.gallery_projects p where p.id = project_id and p.publication_state = 'draft'));
create policy gallery_media_update_guard on public.gallery_project_media as restrictive for update to authenticated
  using ((select public.can_publish_cms()) or exists (select 1 from public.gallery_projects p where p.id = project_id and p.publication_state = 'draft'))
  with check ((select public.can_publish_cms()) or exists (select 1 from public.gallery_projects p where p.id = project_id and p.publication_state = 'draft'));
create policy gallery_media_delete_guard on public.gallery_project_media as restrictive for delete to authenticated
  using ((select public.can_publish_cms()) or exists (select 1 from public.gallery_projects p where p.id = project_id and p.publication_state = 'draft'));

create table public.cms_history (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  actor uuid references auth.users(id) on delete set null,
  actor_email text,
  operation text not null,
  sections text[] not null default '{}',
  content jsonb not null
);
alter table public.cms_history enable row level security;
revoke all on public.cms_history from public, anon, authenticated;
grant select (id, created_at, actor_email, operation, sections) on public.cms_history to authenticated;
create policy cms_history_read on public.cms_history for select to authenticated using ((select public.can_publish_cms()));
insert into public.cms_history(operation, content) select 'Baseline', content from public.site_content where stage = 'live';

create function site_private.record_cms_history() returns trigger
language plpgsql set search_path = '' as $$
begin
  insert into public.cms_history(actor, actor_email, operation, sections, content)
    select auth.uid(), auth.jwt()->>'email', coalesce(nullif(current_setting('app.cms_operation', true), ''), 'Publish'),
      array(select key from jsonb_object_keys(old.content || new.content) as key where old.content->key is distinct from new.content->key order by key),
      new.content;
  return new;
end;
$$;
create trigger cms_history_record after update on public.site_content for each row
  when (new.stage = 'live') execute function site_private.record_cms_history();

revoke execute on function site_private.change_content(text, integer, jsonb) from authenticated;
create function site_private.manage_cms_content(action text, expected_revision integer, replacement jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare snapshot jsonb;
begin
  if not public.is_gallery_editor() or (action <> 'save' and not public.can_publish_cms()) then
    raise exception 'Your role cannot perform this action' using errcode = '42501';
  end if;
  perform set_config('app.cms_operation', case when action in ('restore','restore_version') then 'Restore' else 'Publish' end, true);
  if action = 'restore_version' then
    select content into strict snapshot from public.cms_history where id = (replacement->>'id')::bigint;
    perform 1 from public.site_content where stage = 'draft' and revision = expected_revision for update;
    if not found then raise exception 'The site draft changed. Reload before restoring.'; end if;
    insert into public.site_content(stage, content, revision)
      select 'previous', content, revision from public.site_content where stage = 'live'
      on conflict (stage) do update set content = excluded.content, revision = excluded.revision;
    update public.site_content set content = snapshot, revision = revision + 1, updated_at = now() where stage = 'live';
    update public.site_content set revision = revision + 1, updated_at = now() where stage = 'draft';
    return expected_revision + 1;
  end if;
  return site_private.change_content(action, expected_revision, replacement);
end;
$$;
revoke all on function site_private.manage_cms_content(text, integer, jsonb) from public;
grant execute on function site_private.manage_cms_content(text, integer, jsonb) to authenticated;
create or replace function public.change_site_content(action text, expected_revision integer, replacement jsonb default null)
returns integer language sql set search_path = '' as $$
  select site_private.manage_cms_content(action, expected_revision, replacement)
$$;

alter table public.form_submissions
  add column status text not null default 'New' check (status in ('New','In Progress','Resolved')),
  add column assigned_to uuid references public.cms_members(user_id) on delete set null,
  add column internal_notes text;
grant select on public.form_submissions to authenticated;
grant update (status, assigned_to, internal_notes) on public.form_submissions to authenticated;
create policy cms_enquiry_read on public.form_submissions for select to authenticated using ((select public.can_publish_cms()));
create policy cms_enquiry_update on public.form_submissions for update to authenticated
  using ((select public.can_publish_cms())) with check ((select public.can_publish_cms()));

create function site_private.cms_staff() returns table(user_id uuid, email text)
language sql stable security definer set search_path = '' as $$
  select m.user_id, u.email::text from public.cms_members m join auth.users u on u.id = m.user_id
  where m.active and m.role in ('editor','administrator') and public.can_publish_cms()
  order by u.email
$$;
revoke all on function site_private.cms_staff() from public;
grant execute on function site_private.cms_staff() to authenticated;
create function public.cms_staff() returns table(user_id uuid, email text)
language sql stable set search_path = '' as $$ select * from site_private.cms_staff() $$;
revoke all on function public.cms_staff() from public, anon;
grant execute on function public.cms_staff() to authenticated;

create table public.cms_media (
  path text primary key check (path ~ '^photos/[0-9a-f-]{36}$'),
  filename text not null check (length(filename) between 1 and 255),
  alt text not null default '' check (length(alt) <= 300),
  created_at timestamptz not null default now()
);
alter table public.cms_media enable row level security;
revoke all on public.cms_media from public, anon, authenticated;
grant select, insert on public.cms_media to authenticated;
grant update(alt) on public.cms_media to authenticated;
create policy cms_media_library_access on public.cms_media to authenticated
  using ((select public.is_gallery_editor())) with check ((select public.is_gallery_editor()));

create function site_private.cms_asset_in_use(path text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from (select content from public.site_content union all select content from public.cms_history) as snapshots
    where jsonb_path_exists(content, '$.images.* ? (@ == $path)', jsonb_build_object('path', path))
      or jsonb_path_exists(content, '$.team[*].photo ? (@ == $path)', jsonb_build_object('path', path))
  )
$$;
revoke all on function site_private.cms_asset_in_use(text) from public;
grant execute on function site_private.cms_asset_in_use(text) to authenticated;
create policy cms_media_delete_unused on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and (select public.can_publish_cms()) and not site_private.cms_asset_in_use(name));
grant delete on public.cms_media to authenticated;
create policy cms_media_remove_record on public.cms_media for delete to authenticated
  using ((select public.can_publish_cms()) and not site_private.cms_asset_in_use(path));

insert into public.cms_media(path, filename)
select name, 'Existing upload ' || left(split_part(name, '/', 2), 8)
from storage.objects where bucket_id = 'site-images' and name ~ '^photos/[0-9a-f-]{36}$';
