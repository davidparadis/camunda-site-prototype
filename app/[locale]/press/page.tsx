"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

interface PressRelease {
  title: string;
  slug: { current: string };
  publishAt: string;
  summary: string;
  body?: any[];
  contactName?: string;
  contactEmail?: string;
}

export default function PressPage() {
  const t = useTranslations("press");
  const locale = useLocale();
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [selected, setSelected] = useState<PressRelease | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const now = new Date().toISOString();

    if (hash) {
      client
        .fetch(
          `*[_type == "pressRelease" && slug.current == $slug && publishAt <= $now && (!defined(language) || language == $locale)][0] {
            title, slug, publishAt, summary, body, contactName, contactEmail
          }`,
          { slug: hash, now, locale }
        )
        .then((data) => {
          if (data) setSelected(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }

    client
      .fetch(
        `*[_type == "pressRelease" && publishAt <= $now && (!defined(language) || language == $locale)]
        | order(publishAt desc) {
          title, slug, publishAt, summary, contactName, contactEmail
        }`,
        { now, locale }
      )
      .then((data) => {
        setReleases(data);
        if (!hash) setLoading(false);
      });
  }, [locale]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setSelected(null);
        return;
      }
      const now = new Date().toISOString();
      client
        .fetch(
          `*[_type == "pressRelease" && slug.current == $slug && publishAt <= $now && (!defined(language) || language == $locale)][0] {
            title, slug, publishAt, summary, body, contactName, contactEmail
          }`,
          { slug: hash, now, locale }
        )
        .then((data) => {
          if (data) setSelected(data);
        });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [locale]);

  const dateLocaleMap: Record<string, string> = {
    en: "en-US",
    de: "de-DE",
    ja: "ja-JP",
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(dateLocaleMap[locale] || "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
          <p className="text-[#A0A0A0]">{t("loading")}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (selected) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-[#0A0A0A] pt-24">
          <article className="mx-auto max-w-3xl px-6 py-16">
            <button
              onClick={() => {
                setSelected(null);
                window.location.hash = "";
              }}
              className="text-sm text-[#A0A0A0] transition-colors hover:text-white"
            >
              &larr; {t("backToNewsroom")}
            </button>

            <time className="mt-8 block text-sm text-[#A0A0A0]">
              {formatDate(selected.publishAt)}
            </time>

            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              {selected.title}
            </h1>

            {selected.summary && (
              <p className="mt-4 text-lg text-[#A0A0A0]">{selected.summary}</p>
            )}

            {selected.body && (
              <div className="prose-invert mt-10 max-w-none text-[#A0A0A0] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_a]:text-[#FF6314] [&_a]:underline">
                <PortableText value={selected.body} />
              </div>
            )}

            {(selected.contactName || selected.contactEmail) && (
              <div className="mt-12 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
                  {t("mediaContact")}
                </p>
                {selected.contactName && (
                  <p className="mt-2 text-white">{selected.contactName}</p>
                )}
                {selected.contactEmail && (
                  <a
                    href={`mailto:${selected.contactEmail}`}
                    className="mt-1 block text-[#FF6314]"
                  >
                    {selected.contactEmail}
                  </a>
                )}
              </div>
            )}
          </article>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0A0A0A] pt-24">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-[#A0A0A0]">{t("subtitle")}</p>

          {releases.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center">
              <p className="text-lg text-[#A0A0A0]">{t("empty")}</p>
            </div>
          ) : (
            <div className="mt-12 flex flex-col gap-6">
              {releases.map((r) => (
                <a
                  key={r.slug.current}
                  href={`#${r.slug.current}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = r.slug.current;
                    const now = new Date().toISOString();
                    client
                      .fetch(
                        `*[_type == "pressRelease" && slug.current == $slug && publishAt <= $now && (!defined(language) || language == $locale)][0] {
                          title, slug, publishAt, summary, body, contactName, contactEmail
                        }`,
                        { slug: r.slug.current, now, locale }
                      )
                      .then((data) => {
                        if (data) setSelected(data);
                      });
                  }}
                  className="group rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 transition-colors hover:border-[#3A3A3A]"
                >
                  <time className="text-sm text-[#A0A0A0]">
                    {formatDate(r.publishAt)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-[#FF6314]">
                    {r.title}
                  </h2>
                  {r.summary && (
                    <p className="mt-3 text-[#A0A0A0]">{r.summary}</p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
