"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { client } from "@/sanity/lib/client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

interface Event {
  title: string;
  slug: { current: string };
  eventDate: string;
  eventEndDate?: string;
  eventType?: string;
  region?: string;
  location?: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

const typeBorderColors: Record<string, string> = {
  conference: "border-blue-500",
  webinar: "border-purple-500",
  tradeshow: "border-emerald-500",
  field: "border-yellow-500",
  virtual: "border-cyan-500",
};

export default function EventsPage() {
  const t = useTranslations("events");
  const tTypes = useTranslations("eventTypes");
  const tRegions = useTranslations("regions");
  const locale = useLocale();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const now = new Date().toISOString();
    client
      .fetch(
        `
      *[_type == "event" && eventDate >= $now && (!defined(language) || language == $locale)]
      | order(eventDate asc) {
        title, slug, eventDate, eventEndDate, eventType,
        region, location, description, ctaLabel, ctaUrl
      }
    `,
        { now, locale }
      )
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const filtered = events.filter((e) => {
    if (typeFilter && e.eventType !== typeFilter) return false;
    if (regionFilter && e.region !== regionFilter) return false;
    return true;
  });

  const dateLocaleMap: Record<string, string> = {
    en: "en-US",
    de: "de-DE",
    ja: "ja-JP",
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0A0A0A] pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-[#A0A0A0]">{t("subtitle")}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white focus:border-[#3A3A3A] focus:outline-none"
            >
              <option value="">{t("allTypes")}</option>
              {["conference", "webinar", "tradeshow", "field", "virtual"].map(
                (val) => (
                  <option key={val} value={val}>
                    {tTypes(val)}
                  </option>
                )
              )}
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white focus:border-[#3A3A3A] focus:outline-none"
            >
              <option value="">{t("allRegions")}</option>
              {["na", "emea", "apac", "global"].map((val) => (
                <option key={val} value={val}>
                  {tRegions(val)}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="mt-16 text-center text-[#A0A0A0]">
              {t("loading")}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center">
              <p className="text-lg text-[#A0A0A0]">{t("empty")}</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ev) => (
                <div
                  key={ev.slug.current}
                  className={`flex flex-col rounded-2xl border bg-[#1A1A1A] p-6 ${
                    ev.eventType && typeBorderColors[ev.eventType]
                      ? typeBorderColors[ev.eventType]
                      : "border-[#2A2A2A]"
                  }`}
                >
                  {ev.eventType && (
                    <span className="mb-3 inline-block w-fit rounded-full border border-[#2A2A2A] px-3 py-1 text-xs font-medium text-[#A0A0A0]">
                      {tTypes(ev.eventType)}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {ev.title}
                  </h3>

                  <time className="mt-2 text-sm text-[#A0A0A0]">
                    {new Date(ev.eventDate).toLocaleDateString(
                      dateLocaleMap[locale] || "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>

                  {ev.location && (
                    <p className="mt-1 text-sm text-[#A0A0A0]">
                      {ev.location}
                    </p>
                  )}

                  {ev.region && (
                    <p className="mt-1 text-xs text-[#A0A0A0]">
                      {tRegions(ev.region)}
                    </p>
                  )}

                  {ev.description && (
                    <p className="mt-3 flex-1 text-sm text-[#A0A0A0]">
                      {ev.description}
                    </p>
                  )}

                  {ev.ctaUrl && (
                    <a
                      href={ev.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded-full bg-[#FF6314] px-5 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {ev.ctaLabel || t("register")}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
