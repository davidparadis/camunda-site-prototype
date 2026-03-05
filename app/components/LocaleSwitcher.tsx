"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { en: "EN", de: "DE", ja: "JP" };

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-1 text-sm">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded px-2 py-1 transition-colors ${
            locale === l
              ? "border border-[#2A2A2A] text-white"
              : "text-[#A0A0A0] hover:text-white"
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
