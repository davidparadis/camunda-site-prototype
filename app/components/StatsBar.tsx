"use client";

import { useTranslations } from "next-intl";

export default function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  return (
    <section className="border-t-2 border-t-[#FF6314] border-b border-b-[#2A2A2A] bg-[#111111] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="text-6xl font-bold text-white">{s.value}</div>
              <p className="mt-3 text-sm text-[#A0A0A0]">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#A0A0A0]">
          {t("source")}
        </p>
      </div>
    </section>
  );
}
