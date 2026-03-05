import translate from "google-translate-api-x";
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const sanityClient = createClient({
  projectId: "mr5heny6",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const SUPPORTED_LOCALES = ["de", "ja"];

async function translateText(text: string, targetLocale: string): Promise<string> {
  const result = await translate(text, { from: "en", to: targetLocale });
  return result.text;
}

async function translateUIStrings(targetLocale: string) {
  const enPath = path.join(__dirname, "..", "messages", "en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const translated: Record<string, any> = {};

  for (const [section, strings] of Object.entries(en)) {
    translated[section] = {};
    for (const [key, value] of Object.entries(
      strings as Record<string, string>
    )) {
      try {
        translated[section][key] = await translateText(value, targetLocale);
        // Small delay to avoid rate limiting
        await new Promise((r) => setTimeout(r, 100));
      } catch (err) {
        console.warn(`  Skipped ${section}.${key}: ${err}`);
        translated[section][key] = value;
      }
    }
  }

  const outPath = path.join(
    __dirname,
    "..",
    "messages",
    `${targetLocale}.json`
  );
  fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
  console.log(`✓ UI strings translated to ${targetLocale} → ${outPath}`);
}

async function translateSanityContent(targetLocale: string) {
  if (!process.env.SANITY_API_TOKEN) {
    console.log(
      "  Skipping Sanity content translation (no SANITY_API_TOKEN)"
    );
    return;
  }

  const docs = await sanityClient.fetch(
    `*[_type in ["pressRelease", "event"] && language == "en"]`
  );

  for (const doc of docs) {
    const translatedTitle = await translateText(doc.title, targetLocale);

    const translatedSummary =
      doc.summary || doc.description
        ? await translateText(doc.summary || doc.description, targetLocale)
        : null;

    const newDoc: any = {
      _type: doc._type,
      title: translatedTitle,
      slug: { _type: "slug", current: `${doc.slug.current}-${targetLocale}` },
      language: targetLocale,
    };

    // Copy date fields
    if (doc.publishAt) newDoc.publishAt = doc.publishAt;
    if (doc.eventDate) newDoc.eventDate = doc.eventDate;
    if (doc.eventEndDate) newDoc.eventEndDate = doc.eventEndDate;
    if (doc.eventType) newDoc.eventType = doc.eventType;
    if (doc.region) newDoc.region = doc.region;
    if (doc.location) newDoc.location = doc.location;
    if (doc.ctaUrl) newDoc.ctaUrl = doc.ctaUrl;
    if (doc.contactName) newDoc.contactName = doc.contactName;
    if (doc.contactEmail) newDoc.contactEmail = doc.contactEmail;

    // Set translated text fields
    if (doc.summary) newDoc.summary = translatedSummary;
    if (doc.description) newDoc.description = translatedSummary;
    if (doc.ctaLabel) {
      newDoc.ctaLabel = await translateText(doc.ctaLabel, targetLocale);
    }

    await sanityClient.create(newDoc);
    console.log(`  ✓ Translated "${doc.title}" → ${targetLocale}`);
  }
}

async function main() {
  const targetLocale = process.argv[2]?.replace("--locale=", "");
  if (!targetLocale || !SUPPORTED_LOCALES.includes(targetLocale)) {
    console.error("Usage: npm run translate -- --locale=de");
    process.exit(1);
  }

  console.log(`\nTranslating to ${targetLocale}...\n`);

  await translateUIStrings(targetLocale);
  await translateSanityContent(targetLocale);

  console.log(
    "\n✓ Translation complete. Review drafts in Sanity Studio.\n"
  );
}

main().catch(console.error);
