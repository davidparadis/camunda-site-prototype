import { client } from "@/sanity/lib/client";

const now = new Date().toISOString();

// Press releases: only published (publishAt <= now), newest first
export async function getPressReleases() {
  return client.fetch(
    `
    *[_type == "pressRelease" && publishAt <= $now]
    | order(publishAt desc) {
      title, slug, publishAt, summary, contactName, contactEmail
    }
  `,
    { now }
  );
}

export async function getPressReleaseBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "pressRelease" && slug.current == $slug && publishAt <= $now][0] {
      title, publishAt, summary, body, contactName, contactEmail
    }
  `,
    { slug, now }
  );
}

export async function getAllPressReleaseSlugs() {
  return client.fetch<{ slug: { current: string } }[]>(
    `
    *[_type == "pressRelease" && publishAt <= $now] {
      slug
    }
  `,
    { now }
  );
}

// Events: only future events (eventDate >= now), soonest first
export async function getUpcomingEvents() {
  return client.fetch(
    `
    *[_type == "event" && eventDate >= $now]
    | order(eventDate asc) {
      title, slug, eventDate, eventEndDate, eventType,
      region, location, description, ctaLabel, ctaUrl, featuredImage
    }
  `,
    { now }
  );
}
