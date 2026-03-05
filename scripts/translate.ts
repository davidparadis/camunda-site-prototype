import * as deepl from "deepl-node";
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) {
  console.error("Missing DEEPL_API_KEY environment variable");
  process.exit(1);
}

const translator = new deepl.Translator(DEEPL_API_KEY);

const sanityClient = createClient({
  projectId: "mr5heny6",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const LOCALE_MAP: Record<string, deepl.TargetLanguageCode> = {
  de: "de",
  ja: "ja",
};

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
        const result = await translator.translateText(
          value,
          "en",
          LOCALE_MAP[targetLocale]
        );
        translated[section][key] = result.text;
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
    const translatedTitle = await translator.translateText(
      doc.title,
      "en",
      LOCALE_MAP[targetLocale]
    );

    const translatedSummary =
      doc.summary || doc.description
        ? await translator.translateText(
            doc.summary || doc.description,
            "en",
            LOCALE_MAP[targetLocale]
          )
        : null;

    const newDoc: any = {
      _type: doc._type,
      title: translatedTitle.text,
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
    if (doc.summary) newDoc.summary = translatedSummary?.text;
    if (doc.description) newDoc.description = translatedSummary?.text;
    if (doc.ctaLabel) {
      const translatedCta = await translator.translateText(
        doc.ctaLabel,
        "en",
        LOCALE_MAP[targetLocale]
      );
      newDoc.ctaLabel = translatedCta.text;
    }

    await sanityClient.create(newDoc);
    console.log(`  ✓ Translated "${doc.title}" → ${targetLocale}`);
  }
}

async function main() {
  const targetLocale = process.argv[2]?.replace("--locale=", "");
  if (!targetLocale || !LOCALE_MAP[targetLocale]) {
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
