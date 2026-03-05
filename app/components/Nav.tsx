"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("product"), href: "/" as const },
    { label: t("whyCamunda"), href: "/" as const },
    { label: t("customers"), href: "/" as const },
    { label: t("resources"), href: "/" as const },
    { label: t("newsroom"), href: "/press" as const },
    { label: t("events"), href: "/events" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          CAMUNDA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap text-sm font-medium text-[#A0A0A0] transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <Link
            href="/"
            className="rounded-full bg-[#FF6314] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("getDemo")}
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#2A2A2A] px-6 pb-6 pt-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block py-2 text-sm font-medium text-[#A0A0A0]"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex items-center gap-4">
            <LocaleSwitcher />
            <Link
              href="/"
              className="inline-block rounded-full bg-[#FF6314] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {t("getDemo")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
