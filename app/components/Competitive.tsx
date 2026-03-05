const rows = [
  {
    category: "Agent Frameworks",
    examples: "Microsoft, LangChain, CrewAI",
    their: "They build agents and handle agent creation, reasoning, and tool calling.",
    ours: "We govern how those agents participate in business processes. Complementary, not competitive. We are the orchestration layer above agent frameworks.",
  },
  {
    category: "Task Automation",
    examples: "n8n, Make, Zapier",
    their: "Automate tasks and chain LLM calls. Developer-friendly, fast to prototype.",
    ours: "Camunda orchestrates end-to-end business processes with governance, long-running state, and enterprise scale. They\u2019re connectors; we\u2019re the conductor.",
  },
  {
    category: "Systems of Record",
    examples: "ServiceNow, Salesforce, SAP",
    their: "Workflow capabilities tightly coupled to their own ecosystem.",
    ours: "Camunda is the neutral orchestration layer that coordinates across all these systems into end-to-end flows no single vendor can own.",
  },
  {
    category: "RPA",
    examples: "UiPath, Automation Anywhere",
    their: "Layering AI onto screen scraping. Bottom-up automation via UI interaction.",
    ours: "We started with process orchestration and extended it for agents. They automate screens; we orchestrate outcomes.",
  },
  {
    category: "BPM",
    examples: "Pega, Appian",
    their: "Monolithic suites that require you to move everything into their world.",
    ours: "Open standards, composable architecture, and agent-readiness that legacy BPM cannot retrofit. They require migration; we enable integration.",
  },
];

export default function Competitive() {
  return (
    <section className="border-b border-[#2A2A2A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          How we compare
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          Camunda is the orchestration layer that sits above&mdash;and connects
          across&mdash;every category.
        </p>

        {/* Desktop table */}
        <div className="mt-16 hidden overflow-hidden rounded-2xl border border-[#2A2A2A] md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#111111]">
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  Their approach
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white">
                  Our position
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.category}
                  className={
                    i < rows.length - 1
                      ? "border-b border-[#2A2A2A]"
                      : ""
                  }
                >
                  <td className="px-6 py-5 align-top">
                    <div className="font-semibold text-white">
                      {r.category}
                    </div>
                    <div className="mt-1 text-xs text-[#A0A0A0]">
                      {r.examples}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#A0A0A0]">
                    {r.their}
                  </td>
                  <td className="px-6 py-5 text-sm text-[#A0A0A0]">
                    {r.ours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
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
                  Their approach
                </p>
                <p className="mt-1 text-sm text-[#A0A0A0]">{r.their}</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  Our position
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
