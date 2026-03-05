"use client";

import { useTranslations } from "next-intl";

export default function Proof() {
  const t = useTranslations("proof");

  const customers = [
    { name: t("c1Name"), stat: t("c1Stat"), label: t("c1Label"), desc: t("c1Desc") },
    { name: t("c2Name"), stat: t("c2Stat"), label: t("c2Label"), desc: t("c2Desc") },
    { name: t("c3Name"), stat: t("c3Stat"), label: t("c3Label"), desc: t("c3Desc") },
    { name: t("c4Name"), stat: t("c4Stat"), label: t("c4Label"), desc: t("c4Desc") },
  ];

  const analysts = [
    { org: t("a1Org"), recognition: t("a1Recognition") },
    { org: t("a2Org"), recognition: t("a2Recognition") },
  ];

  return (
    <section className="border-b border-[#2A2A2A] bg-[#111111] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          {t("headline")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          {t("subhead")}
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customers.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[#A0A0A0]">
                {c.name}
              </p>
              <div className="mt-3">
                <span className="text-5xl font-bold text-white">{c.stat}</span>
                <span className="ml-2 text-lg text-[#A0A0A0]">{c.label}</span>
              </div>
              <p className="mt-4 text-sm text-[#A0A0A0]">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
          {analysts.map((a) => (
            <div
              key={a.org}
              className="flex items-center gap-5 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-5"
            >
              <div className="flex items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#111111] px-4 py-3">
                <span className="text-sm font-semibold tracking-widest text-[#A0A0A0]">
                  {a.org}
                </span>
              </div>
              <p className="text-sm text-[#A0A0A0]">{a.recognition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
