const customers = [
  {
    name: "Wellpointe",
    stat: "60%",
    label: "faster",
    description:
      "Replaced manual coordination of insurance verification and logistics with orchestrated workflows.",
  },
  {
    name: "Global Investment Bank",
    stat: "12M+",
    label: "daily orchestrations",
    description:
      "Automated trade settlement previously requiring manual reconciliation.",
  },
  {
    name: "European Insurer",
    stat: "40%",
    label: "less processing time",
    description:
      "AI agents handle initial claims assessment adjusters previously reviewed manually.",
  },
  {
    name: "Global Retailer",
    stat: "99.7%",
    label: "accuracy",
    description:
      "Orchestrated fulfillment across 200+ warehouses replacing manual coordination.",
  },
];

const analysts = [
  {
    org: "Gartner",
    recognition: "Visionary, BOAT MQ 2025",
  },
  {
    org: "Forrester",
    recognition: "5/5 in Orchestration, DPA Wave Q3 2025",
  },
];

export default function Proof() {
  return (
    <section className="border-b border-[#2A2A2A] bg-[#111111] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          Proven at scale
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          Customer outcomes and analyst recognition.
        </p>

        {/* Customer cards */}
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
              <p className="mt-4 text-sm text-[#A0A0A0]">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Analyst recognition */}
        <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
          {analysts.map((a) => (
            <div
              key={a.org}
              className="flex items-center gap-5 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-5"
            >
              <div className="flex items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#111111] px-4 py-3">
                <span className="text-sm font-semibold tracking-widest text-[#A0A0A0]">
                  {a.org.toUpperCase()}
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
