"use client";

import { useTranslations } from "next-intl";

export default function CTAFooter() {
  const t = useTranslations("cta");

  return (
    <section id="cta" className="bg-[#FF6314] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {t("headline")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          {t("subhead")}
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0A0A0A]"
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
