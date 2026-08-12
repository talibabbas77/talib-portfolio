-- Portfolio admin: contact submissions
-- Run in Supabase SQL Editor or via CLI

create type public.submission_status as enum ('new', 'read', 'replied', 'archived');

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status public.submission_status not null default 'new',
  source text not null default 'portfolio',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contact_submissions_updated_at on public.contact_submissions;
create trigger contact_submissions_updated_at
  before update on public.contact_submissions
  for each row execute function public.set_updated_at();

alter table public.contact_submissions enable row level security;

-- Authenticated admin can read and update submissions
create policy "Admin can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

create policy "Admin can update submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- No public insert policy: API uses service role key server-side
