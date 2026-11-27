create schema if not exists site_private;
grant usage on schema site_private to authenticated;

create table public.site_content (
  stage text primary key check (stage in ('draft', 'live', 'previous')),
  content jsonb not null default '{}' check (jsonb_typeof(content) = 'object' and octet_length(content::text) <= 400000),
  revision integer not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_content(stage) values ('draft'), ('live');
alter table public.site_content enable row level security;
revoke all on public.site_content from public, anon, authenticated;
grant select on public.site_content to anon, authenticated;
create policy site_content_read on public.site_content for select to anon, authenticated
  using (stage = 'live' or (select public.is_gallery_editor()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', false, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/avif']);

create policy site_image_editor_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and name ~ '^photos/[0-9a-f-]{36}$' and (select public.is_gallery_editor()));

create policy site_image_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-images' and (
    (select public.is_gallery_editor()) or exists (
      select 1 from public.site_content live
      where live.stage = 'live' and (
        exists (select 1 from jsonb_each_text(coalesce(live.content->'images', '{}')) as image where image.value = storage.objects.name)
        or exists (select 1 from jsonb_array_elements(case when jsonb_typeof(live.content->'team') = 'array' then live.content->'team' else '[]' end) as member
          where member->>'photo' = storage.objects.name and member->>'hidden' is distinct from 'true')
      )
    )
  ));

create function site_private.luminance(color text) returns double precision
language sql immutable strict set search_path = '' as $$
  select sum(weight * case when value <= .04045 then value / 12.92 else power((value + .055) / 1.055, 2.4) end)
  from (values (0,.2126), (1,.7152), (2,.0722)) as channel(i,weight)
  cross join lateral (select get_byte(decode(substr(color, 2),'hex'), i) / 255.0 as value) as rgb
$$;

create function site_private.change_content(action text, expected_revision integer, replacement jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  draft public.site_content;
  source public.site_content;
  background double precision;
  foreground double precision;
  primary_color double precision;
begin
  if not public.is_gallery_editor() then
    raise exception 'Site editor access required' using errcode = '42501';
  end if;
  select * into strict draft from public.site_content where stage = 'draft' for update;
  if draft.revision <> expected_revision then
    raise exception 'The site draft changed. Reload before saving or publishing.';
  end if;

  if action = 'save' then
    if jsonb_typeof(replacement->'images') is distinct from 'object'
      or jsonb_typeof(replacement->'theme') is distinct from 'object'
      or (replacement->'team' <> 'null' and jsonb_typeof(replacement->'team') is distinct from 'array') then
      raise exception 'Invalid site draft';
    end if;
    update public.site_content set content = replacement, revision = revision + 1, updated_at = now() where stage = 'draft';
  elsif action in ('publish', 'restore') then
    select * into source from public.site_content where stage = case when action = 'publish' then 'draft' else 'previous' end;
    if not found then raise exception 'No previous published version'; end if;

    if action = 'publish' then
      if jsonb_typeof(source.content->'team') = 'array' then
        source.content := jsonb_set(source.content, '{team}', coalesce((
          select jsonb_agg(profile order by position)
          from jsonb_array_elements(source.content->'team') with ordinality as profiles(profile, position)
          where profile->>'hidden' is distinct from 'true'
        ), '[]'::jsonb));
      end if;
      if exists (
        select 1 from (
          select value as path from jsonb_each_text(coalesce(source.content->'images', '{}'))
          union select member->>'photo' from jsonb_array_elements(
            case when jsonb_typeof(source.content->'team') = 'array' then source.content->'team' else '[]' end
          ) as member where coalesce(member->>'photo','') <> '' and member->>'hidden' is distinct from 'true'
        ) as assets
        where not exists (select 1 from storage.objects where bucket_id = 'site-images' and name = assets.path)
      ) then raise exception 'A referenced image is unavailable'; end if;

      if coalesce(source.content->'theme'->>'background','#ffffff') !~ '^#[0-9a-fA-F]{6}$'
        or coalesce(source.content->'theme'->>'text','#101b2b') !~ '^#[0-9a-fA-F]{6}$'
        or coalesce(source.content->'theme'->>'primary','#075cda') !~ '^#[0-9a-fA-F]{6}$'
        or coalesce(source.content->'theme'->>'accent','#26adff') !~ '^#[0-9a-fA-F]{6}$' then
        raise exception 'Invalid theme colour';
      end if;
      if exists (
        select 1 from jsonb_each_text(coalesce(source.content->'theme','{}'))
        where key in ('headingFont','bodyFont')
          and value not in ('Inter','Arial','Georgia','Trebuchet MS','Verdana','Times New Roman')
      ) then raise exception 'Unsupported theme font'; end if;
      background := site_private.luminance(coalesce(source.content->'theme'->>'background','#ffffff'));
      foreground := site_private.luminance(coalesce(source.content->'theme'->>'text','#101b2b'));
      primary_color := site_private.luminance(coalesce(source.content->'theme'->>'primary','#075cda'));
      if (greatest(background, foreground) + .05) / (least(background, foreground) + .05) < 4.5
        or 1.05 / (primary_color + .05) < 4.5
        or (greatest(background, primary_color) + .05) / (least(background, primary_color) + .05) < 4.5
        or (site_private.luminance(coalesce(source.content->'theme'->>'accent','#26adff')) + .05)
          / (site_private.luminance('#071826') + .05) < 3 then
        raise exception 'Theme colour contrast is too low';
      end if;
    end if;

    insert into public.site_content(stage, content, revision)
      select 'previous', content, revision from public.site_content where stage = 'live'
      on conflict (stage) do update set content = excluded.content, revision = excluded.revision, updated_at = now();
    update public.site_content set content = source.content, revision = revision + 1, updated_at = now() where stage = 'live';
    update public.site_content set revision = revision + 1, updated_at = now() where stage = 'draft';
  else
    raise exception 'Unknown site operation';
  end if;
  return draft.revision + 1;
end;
$$;

revoke all on function site_private.change_content(text, integer, jsonb) from public, anon;
grant execute on function site_private.change_content(text, integer, jsonb) to authenticated;

create function public.change_site_content(action text, expected_revision integer, replacement jsonb default null)
returns integer language sql security invoker set search_path = '' as $$
  select site_private.change_content(action, expected_revision, replacement)
$$;
revoke all on function public.change_site_content(text, integer, jsonb) from public, anon;
grant execute on function public.change_site_content(text, integer, jsonb) to authenticated;
