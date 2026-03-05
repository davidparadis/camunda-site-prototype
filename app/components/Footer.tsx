"use client";

import { useTranslations } from "next-intl";

const columns = [
  {
    titleKey: "product" as const,
    links: ["Platform", "Modeler", "Connectors", "Pricing"],
  },
  {
    titleKey: "resources" as const,
    links: ["Documentation", "Blog", "Academy", "Community"],
  },
  {
    titleKey: "company" as const,
    links: ["About", "Careers", "Partners", "Contact"],
  },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="text-xl font-bold tracking-tight text-white">
              CAMUNDA
            </p>
            <p className="mt-3 text-sm text-[#A0A0A0]">{t("tagline")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <p className="text-sm font-semibold text-white">
                {t(col.titleKey)}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A0A0A0] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#2A2A2A] pt-8 text-center text-xs text-[#A0A0A0]">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
