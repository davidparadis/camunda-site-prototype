"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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

const typeLabels: Record<string, string> = {
  conference: "Conference",
  webinar: "Webinar",
  tradeshow: "Trade Show",
  field: "Field Event",
  virtual: "Virtual",
};

const regionLabels: Record<string, string> = {
  na: "North America",
  emea: "Europe",
  apac: "Asia Pacific",
  global: "Global / Virtual",
};

const typeBorderColors: Record<string, string> = {
  conference: "border-blue-500",
  webinar: "border-purple-500",
  tradeshow: "border-emerald-500",
  field: "border-yellow-500",
  virtual: "border-cyan-500",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const now = new Date().toISOString();
    client
      .fetch(
        `
      *[_type == "event" && eventDate >= $now]
      | order(eventDate asc) {
        title, slug, eventDate, eventEndDate, eventType,
        region, location, description, ctaLabel, ctaUrl
      }
    `,
        { now }
      )
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => {
    if (typeFilter && e.eventType !== typeFilter) return false;
    if (regionFilter && e.region !== regionFilter) return false;
    return true;
  });

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0A0A0A] pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Events</h1>
        <p className="mt-4 text-lg text-[#A0A0A0]">
          Meet us at upcoming events around the world.
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white focus:border-[#3A3A3A] focus:outline-none"
          >
            <option value="">All Types</option>
            {Object.entries(typeLabels).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white focus:border-[#3A3A3A] focus:outline-none"
          >
            <option value="">All Regions</option>
            {Object.entries(regionLabels).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Events list */}
        {loading ? (
          <div className="mt-16 text-center text-[#A0A0A0]">
            Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center">
            <p className="text-lg text-[#A0A0A0]">
              No upcoming events. Check back soon.
            </p>
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
                {/* Type badge */}
                {ev.eventType && (
                  <span className="mb-3 inline-block w-fit rounded-full border border-[#2A2A2A] px-3 py-1 text-xs font-medium text-[#A0A0A0]">
                    {typeLabels[ev.eventType] || ev.eventType}
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">
                  {ev.title}
                </h3>

                <time className="mt-2 text-sm text-[#A0A0A0]">
                  {new Date(ev.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                {ev.location && (
                  <p className="mt-1 text-sm text-[#A0A0A0]">{ev.location}</p>
                )}

                {ev.region && (
                  <p className="mt-1 text-xs text-[#A0A0A0]">
                    {regionLabels[ev.region] || ev.region}
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
                    {ev.ctaLabel || "Register Now"}
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
