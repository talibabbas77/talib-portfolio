# Admin setup

The portfolio admin lives at **`/admin`**. It is not linked from the public site.

**Supabase project:** `ackxcnyddqzbukjeikqs`  
**Cursor MCP:** configured in `.cursor/mcp.json` (reload Cursor, then authenticate Supabase MCP when prompted).

## What it does

- **Contact inbox** - form submissions stored in Supabase, SMTP emails in parallel
- **Blog** - create, edit, publish posts with TipTap rich text and cover images
- **Case studies** - structured fields plus rich body content and hero images
- **Newsletter** - view subscribers, mark active/unsubscribed, export from table
- **Media uploads** - images go to the Supabase `media` bucket (file upload or URL)

Public blog and case study pages read published content from Supabase. If the database is empty or unavailable, they fall back to static content in `lib/content/`.

## 1. Supabase project (already linked)

This repo is wired to Supabase project **`ackxcnyddqzbukjeikqs`**.

1. Reload Cursor so `.cursor/mcp.json` loads.
2. When prompted, **authenticate Supabase MCP** in Cursor settings.
3. Open **Project Settings → API** and copy keys into `.env.local`:
   - Project URL
   - `anon` public key
   - `service_role` secret key (server only)

Agent skills installed: `.agents/skills/supabase` and `supabase-postgres-best-practices`.

## 2. Run database setup

**Option A - SQL Editor (no database password):**

In Supabase **SQL Editor**, run each file in order:

1. `supabase/migrations/001_contact_submissions.sql`
2. `supabase/migrations/002_cms_platform.sql`

Then seed content from your machine:

```bash
pnpm seed:cms
```

**Option B - CLI script (recommended):**

1. Copy your database password from Supabase **Settings → Database**
2. Add to `.env.local`: `SUPABASE_DB_PASSWORD=your-password`
3. Optionally set region if the default fails: `SUPABASE_DB_REGION=ap-southeast-1`
4. Run:

```bash
pnpm db:setup
```

This applies migrations, creates RLS and the `media` bucket, and seeds **10 blog posts** + **10 case studies**.

### Re-seed content only (tables already exist)

```bash
pnpm seed:cms
```

## 3. Create your admin user

In Supabase **Authentication → Users**, click **Add user** and create an account with your email and a strong password.

Only users you create here can sign in to `/admin`.

## 4. Add environment variables

In `.env.local`:

```env
# Existing email vars
EMAIL_HOST=
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
EMAIL_TO=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Restart the dev server after saving.

## 5. Sign in

1. Open **`http://localhost:3000/admin/login`** (or `https://your-domain.com/admin/login`)
2. Enter the Supabase Auth email and password
3. You land on **`/admin`** with the dashboard

If tables are missing, the dashboard shows setup instructions. Run `pnpm db:setup` or apply the migration files manually, then refresh.

## Admin routes

| Section | Route | Notes |
|---------|-------|-------|
| Dashboard | `/admin` | Counts across contact, blog, case studies, newsletter |
| Contact inbox | `/admin/contact` | List and open submissions |
| Submission detail | `/admin/submissions/[id]` | Mark read, replied, archived |
| Blog | `/admin/blog` | List, create, edit, publish |
| Case studies | `/admin/case-studies` | List, create, edit, publish |
| Newsletter | `/admin/newsletter` | Subscribers and status |

Unauthenticated visits to `/admin/*` redirect to login.

## APIs

| Method | Route | Auth |
|--------|-------|------|
| POST | `/api/contact-simple` | Public - saves submission + sends email |
| POST | `/api/newsletter/subscribe` | Public - adds subscriber |
| GET/POST | `/api/admin/blog` | Admin |
| GET/PATCH/DELETE | `/api/admin/blog/[id]` | Admin |
| GET/POST | `/api/admin/case-studies` | Admin |
| GET/PATCH/DELETE | `/api/admin/case-studies/[id]` | Admin |
| GET | `/api/admin/newsletter` | Admin |
| PATCH/DELETE | `/api/admin/newsletter/[id]` | Admin |
| POST | `/api/admin/upload` | Admin - uploads to `media` bucket |

## Notes

- Submissions are saved with the **service role** key from the contact API. Email still works if Supabase is down; storage is skipped silently in that case.
- `/admin` is excluded from search indexing.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never expose it in client code.
- Image uploads accept JPEG, PNG, WebP, GIF, and SVG up to 5 MB. You can also paste an external image URL in the admin forms.

## Turnstile (contact bot protection)

Contact forms use Cloudflare Turnstile. Required env vars:

```env
CLOUDFLARE_SITE_KEY=          # or NEXT_PUBLIC_TURNSTILE_SITE_KEY
CLOUDFLARE_SECRET_KEY=        # or TURNSTILE_SECRET
```

Optional: `TURNSTILE_HOSTNAMES=localhost,127.0.0.1,talibabbas.vercel.app`

- **`/contact`** redirects to **`/contact/verify`** until Turnstile passes (1-hour cookie)
- Home page contact form shows the widget above the submit button
- **`/api/contact-simple`** validates `contact_submit` tokens server-side before sending email
