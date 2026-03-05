"use client";

import { useTranslations } from "next-intl";

const icons = [
  <svg key="1" viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <rect x="4" y="4" width="40" height="40" rx="8" stroke="#A0A0A0" strokeWidth="2" />
    <circle cx="24" cy="24" r="8" stroke="#A0A0A0" strokeWidth="2" />
    <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="#A0A0A0" strokeWidth="2" />
  </svg>,
  <svg key="2" viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M8 24h32" stroke="#A0A0A0" strokeWidth="2" />
    <path d="M8 24c0-8 6-16 16-16" stroke="#A0A0A0" strokeWidth="2" />
    <path d="M40 24c0 8-6 16-16 16" stroke="#A0A0A0" strokeWidth="2" strokeDasharray="4 3" />
  </svg>,
  <svg key="3" viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <rect x="6" y="14" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
    <rect x="18" y="22" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
    <rect x="30" y="14" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
    <path d="M18 20l-4 0M30 28l4 0" stroke="#A0A0A0" strokeWidth="2" />
  </svg>,
  <svg key="4" viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 6l16 9v18l-16 9-16-9V15l16-9z" stroke="#A0A0A0" strokeWidth="2" />
    <path d="M24 24V6M24 24l16 9M24 24L8 33" stroke="#A0A0A0" strokeWidth="2" />
  </svg>,
];

export default function Differentiators() {
  const t = useTranslations("differentiators");

  const cards = [
    { icon: icons[0], title: t("card1Title"), description: t("card1Desc") },
    { icon: icons[1], title: t("card2Title"), description: t("card2Desc") },
    { icon: icons[2], title: t("card3Title"), description: t("card3Desc") },
    { icon: icons[3], title: t("card4Title"), description: t("card4Desc") },
  ];

  return (
    <section id="differentiators" className="border-b border-[#2A2A2A] bg-[#111111] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          {t("headline")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          {t("subhead")}
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8"
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-[#A0A0A0]">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
