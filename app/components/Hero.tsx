"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          {t("headline")}{" "}
          <span className="bg-gradient-to-r from-white to-[#A0A0A0] bg-clip-text text-transparent">
            {t("headlineAccent")}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#A0A0A0] md:text-xl">
          {t("subhead")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#cta"
            className="rounded-full bg-[#FF6314] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#differentiators"
            className="rounded-full border border-[#2A2A2A] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#A0A0A0]"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
