# WesDev

> Fast, reliable, custom web software — designed and shipped end to end. Built from scratch, no templates.

**Live URL:** `https://yourdomain.com` _(placeholder — update after deploy)_

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)

A single-page portfolio and services website for the **WesDev** brand — a dark,
engineering-grade showcase and lead-generation tool. Near-black OKLCH theme, a
single lime accent, monospace eyebrow labels, a masked grid + glow hero, and
quiet Framer Motion scroll reveals.

---

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui-style components (restyled to OKLCH tokens)
- **Animation:** Framer Motion (viewport-triggered reveals, count-up stats)
- **Content:** Local Markdown / JSON parsed with `gray-matter`
- **Email:** Web3Forms (contact form)
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

---

## Prerequisites

- **Node.js** 18.18+ (20 LTS or newer recommended)
- **npm** 9+ (or pnpm / yarn — examples use npm)

---

## Local development

```bash
# 1. Clone
git clone <your-repo-url> wesdev && cd wesdev

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
#   then fill in WEB3FORMS_ACCESS_KEY (optional) and NEXT_PUBLIC_SITE_URL

# 4. Start the dev server
npm run dev
# → http://localhost:3000
```

Other scripts:

| Script           | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start the development server                 |
| `npm run build`  | Production build (runs `next-sitemap` after) |
| `npm run start`  | Serve the production build                   |
| `npm run lint`   | Run ESLint                                   |
| `npm run format` | Format with Prettier                         |

---

## Folder structure

```
app/                     Next.js App Router
  layout.tsx             Fonts, metadata (SEO/OG), Vercel Analytics
  page.tsx               Single page — composes all sections
  globals.css            Tailwind + OKLCH design tokens
  icon.png               Favicon (apple-icon.png + manifest.ts alongside)
  api/contact/route.ts   Web3Forms contact-form handler
components/
  layout/                Navbar, Footer
  sections/              Hero, About, Stack, Work, Contact, ContactSidebar
  shared/                Eyebrow, Section, Reveal
  ui/                    shadcn-style Button, Card, Input, Textarea, Badge
content/
  about.json             About copy + count-up stats
  services/*.md          Service / capability columns (Stack section)
  work/*.md              Selected-work projects (Work section)
  blog/                  MDX posts (future use)
lib/
  content.ts             Read/parse content (gray-matter)
  site.ts                Business / contact details
  utils.ts               cn() class helper
  integrations/          CMS / Auth / Booking / E-commerce skeletons
public/images/           Portrait, work thumbnails, logo, OG image
types/index.ts           Shared TypeScript interfaces
```

---

## Content management

All content is local — no CMS required. Files are read at build time.

### Add a service / capability (Stack section)

Create `content/services/05-your-service.md`:

```md
---
order: 5
title: Your Service
items:
  - First capability
  - Second capability
---

Optional supporting copy.
```

### Add a selected-work project (Work section)

Create `content/work/05-your-project.md`:

```md
---
order: 5
title: Project Name
year: '2026'
tag: SaaS · 2026
description: One-line summary shown on the card.
tech:
  - Next.js
  - Postgres
image: /images/work/your-project.jpg # or null for the placeholder frame
imageAlt: Descriptive alt text
url: 'https://example.com'
---
```

### Edit the About section

Edit `content/about.json` — heading, paragraphs (`**bold**` → accented text),
portrait `image` path, and the three count-up `stats`.

### Add a blog post (future use)

Drop an `.mdx` file in `content/blog/` with frontmatter. Posts are authored in
MDX and may embed React components; parsing helpers live in `lib/content.ts`.

---

## Deployment

### Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects Next.js (build `next build`, output `.next`).
3. Add the environment variables (below) in **Project → Settings → Environment
   Variables**.
4. Deploy. `next-sitemap` generates `sitemap.xml` + `robots.txt` on each build.

### GoDaddy DNS

Point your GoDaddy domain at Vercel using **either** option:

**Option A — Vercel nameservers (simplest):**

1. In Vercel: **Project → Settings → Domains**, add your domain.
2. In GoDaddy: **My Products → DNS → Nameservers → Change → Enter my own**, and
   set the two nameservers Vercel provides.

**Option B — DNS records (keep GoDaddy nameservers):**

1. In GoDaddy DNS, add an **A** record: `@` → `76.76.21.21`.
2. Add a **CNAME**: `www` → `cname.vercel-dns.com`.
3. Add the apex domain in Vercel and let it verify.

DNS changes can take up to 48 hours to propagate.

---

## Environment variables

| Variable                | Required | Description                                                  |
| ----------------------- | -------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | No | Web3Forms access key for the contact form, posted from the browser (falls back to the bundled project key if unset). |
| `NEXT_PUBLIC_SITE_URL`  | Yes      | Public site URL — canonical/OG tags + sitemap base.          |

The contact form delivers to the inbox registered against the Web3Forms access
key. Business details (name, email, phone) live in `lib/site.ts`.

---

## Contributing

_Placeholder._ Open an issue or PR. Run `npm run lint && npm run format` before
submitting. Conventional Commits encouraged.

---

## License

© 2026 WesDev. All rights reserved. _(Add a license file if open-sourcing.)_
