-- CMS: blogs, case studies, newsletter + media bucket

create type public.content_status as enum ('draft', 'published');

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kicker text not null default '',
  summary text not null default '',
  content_html text not null default '',
  published_at date,
  read_time text not null default '5 min',
  featured boolean not null default false,
  tags text[] not null default '{}',
  cover_image_url text,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kicker text not null default '',
  summary text not null default '',
  content_html text not null default '',
  year text not null default '',
  role text not null default '',
  client_type text not null default '',
  stack text[] not null default '{}',
  live_url text,
  github_url text,
  image_url text not null default '',
  image_alt text not null default '',
  featured boolean not null default false,
  problem text not null default '',
  approach text[] not null default '{}',
  outcomes text[] not null default '{}',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.newsletter_status as enum ('active', 'unsubscribed');

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status public.newsletter_status not null default 'active',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc);

create index if not exists case_studies_status_created_at_idx
  on public.case_studies (status, created_at desc);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop trigger if exists case_studies_updated_at on public.case_studies;
create trigger case_studies_updated_at
  before update on public.case_studies
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.case_studies enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Public read published blog posts"
  on public.blog_posts for select
  using (status = 'published');

create policy "Admin manage blog posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

create policy "Public read published case studies"
  on public.case_studies for select
  using (status = 'published');

create policy "Admin manage case studies"
  on public.case_studies for all
  to authenticated
  using (true)
  with check (true);

create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

create policy "Admin read newsletter subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

create policy "Admin update newsletter subscribers"
  on public.newsletter_subscribers for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin delete newsletter subscribers"
  on public.newsletter_subscribers for delete
  to authenticated
  using (true);

-- Storage bucket for CMS media
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "Admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "Admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- Grant Data API access (Supabase may require explicit grants)
grant usage on schema public to anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant select on public.case_studies to anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
grant all on public.blog_posts to authenticated;
grant all on public.case_studies to authenticated;
grant select, update, delete on public.newsletter_subscribers to authenticated;
