"use client";

import { useTranslations } from "next-intl";

export default function Competitive() {
  const t = useTranslations("competitive");

  const rows = [
    { category: t("row1Category"), examples: t("row1Examples"), their: t("row1Their"), ours: t("row1Ours") },
    { category: t("row2Category"), examples: t("row2Examples"), their: t("row2Their"), ours: t("row2Ours") },
    { category: t("row3Category"), examples: t("row3Examples"), their: t("row3Their"), ours: t("row3Ours") },
    { category: t("row4Category"), examples: t("row4Examples"), their: t("row4Their"), ours: t("row4Ours") },
    { category: t("row5Category"), examples: t("row5Examples"), their: t("row5Their"), ours: t("row5Ours") },
  ];

  return (
    <section className="border-b border-[#2A2A2A] bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          {t("headline")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          {t("subhead")}
        </p>

        <div className="mt-16 hidden overflow-hidden rounded-2xl border border-[#2A2A2A] md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#111111]">
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  {t("category")}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  {t("theirApproach")}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  {t("ourPosition")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.category}
                  className={i < rows.length - 1 ? "border-b border-[#2A2A2A]" : ""}
                >
                  <td className="px-6 py-5 align-top">
                    <div className="font-semibold text-white">{r.category}</div>
                    <div className="mt-1 text-xs text-[#A0A0A0]">{r.examples}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#A0A0A0]">{r.their}</td>
                  <td className="px-6 py-5 text-sm text-[#A0A0A0]">{r.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 flex flex-col gap-4 md:hidden">
          {rows.map((r) => (
            <div
              key={r.category}
              className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6"
            >
              <h3 className="font-semibold text-white">{r.category}</h3>
              <p className="mt-1 text-xs text-[#A0A0A0]">{r.examples}</p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
                  {t("theirApproach")}
                </p>
                <p className="mt-1 text-sm text-[#A0A0A0]">{r.their}</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  {t("ourPosition")}
                </p>
                <p className="mt-1 text-sm text-[#A0A0A0]">{r.ours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
