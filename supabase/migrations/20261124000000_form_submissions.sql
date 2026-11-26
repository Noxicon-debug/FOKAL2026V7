create table public.form_submissions (
  netlify_submission_id text primary key,
  form_name text not null check (form_name in ('booking', 'contact')),
  received_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  organisation_type text,
  services text,
  subject text,
  message text not null,
  consent boolean not null
);

alter table public.form_submissions enable row level security;
revoke all on table public.form_submissions from public, anon, authenticated;
grant insert on table public.form_submissions to service_role;
grant select (netlify_submission_id) on table public.form_submissions to service_role;
