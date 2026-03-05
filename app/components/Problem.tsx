"use client";

import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("problem");

  return (
    <section className="border-b border-[#2A2A2A] bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {t("headline")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[#A0A0A0]">
          {t("para1")}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[#A0A0A0]">
          {t("para2")}
        </p>
      </div>
    </section>
  );
}
