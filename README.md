# Camunda Site Prototype

Static website prototype for camunda.com — built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS.

**Live URL:** https://davidparadis.github.io/camunda-site-prototype/

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/camunda-site-prototype](http://localhost:3000/camunda-site-prototype).

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=mr5heny6
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
```

## Sanity Studio

Content is managed through [Sanity Studio](https://www.sanity.io/manage). Editors can:

- **Press Releases:** Create with a scheduled `publishAt` date. Only releases with `publishAt <= now` appear on the site.
- **Events:** Create with an `eventDate`. Only future events appear. Past events auto-expire on nightly rebuild.

### Content Types

| Type | Fields | Behavior |
|------|--------|----------|
| Press Release | title, slug, publishAt, summary, body, contact info | Scheduled publish via `publishAt` date |
| Event | title, slug, eventDate, type, region, location, CTA | Auto-expires after event date |

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Deployment

Three GitHub Actions workflows handle deployment:

1. **Deploy on push** — triggers on push to `main`
2. **Deploy on Sanity publish** — triggers via webhook when content is published in Sanity
3. **Nightly rebuild** — runs at 1am UTC daily to handle scheduled publishes and event expiry

**Setup:** In repo Settings → Pages, set source to the `gh-pages` branch.

### Sanity Webhook

Configure in [sanity.io/manage](https://www.sanity.io/manage) → API → Webhooks:

- **URL:** `https://api.github.com/repos/davidparadis/camunda-site-prototype/dispatches`
- **Method:** POST
- **Trigger on:** Create, Update, Publish
- **Headers:** `Authorization: token YOUR_GITHUB_PAT` and `Content-Type: application/json`
- **Payload:** `{"event_type": "sanity-publish"}`
