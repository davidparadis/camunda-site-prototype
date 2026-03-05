const stats = [
  { value: "71%", label: "of organizations use AI agents" },
  { value: "11%", label: "of agentic AI use cases reached production" },
  { value: "88%", label: "say orchestration is needed to maximize value" },
  { value: "85%", label: "lack the process maturity to do it" },
];

export default function StatsBar() {
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
          Camunda, State of Agentic Orchestration and Automation 2026 (1,150 IT
          leaders)
        </p>
      </div>
    </section>
  );
}
