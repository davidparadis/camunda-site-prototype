const cards = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="4" y="4" width="40" height="40" rx="8" stroke="#A0A0A0" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="#A0A0A0" strokeWidth="2" />
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="#A0A0A0" strokeWidth="2" />
      </svg>
    ),
    title: "Outside & inside orchestration",
    description:
      "We inject must-follow operating procedures between the agent\u2019s brain and its hands. If an agent decides to send an email, BPMN can force a human approval step first. No other vendor does this.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M8 24h32" stroke="#A0A0A0" strokeWidth="2" />
        <path d="M8 24c0-8 6-16 16-16" stroke="#A0A0A0" strokeWidth="2" />
        <path d="M40 24c0 8-6 16-16 16" stroke="#A0A0A0" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    ),
    title: "Deterministic + dynamic",
    description:
      "Straight-through processing for predictable steps. Agent reasoning for exceptions. Seamlessly blended in one BPMN process, with the ability to dial autonomy up or down per step.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="6" y="14" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
        <rect x="18" y="22" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
        <rect x="30" y="14" width="12" height="12" rx="3" stroke="#A0A0A0" strokeWidth="2" />
        <path d="M18 20l-4 0M30 28l4 0" stroke="#A0A0A0" strokeWidth="2" />
      </svg>
    ),
    title: "Agent-agnostic & composable",
    description:
      "Orchestrate agents from any provider\u2014Microsoft, LangChain, CrewAI, custom-built\u2014via MCP and A2A protocol connectors. No lock-in. Change LLMs or runtimes without rewriting process logic.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 6l16 9v18l-16 9-16-9V15l16-9z" stroke="#A0A0A0" strokeWidth="2" />
        <path d="M24 24V6M24 24l16 9M24 24L8 33" stroke="#A0A0A0" strokeWidth="2" />
      </svg>
    ),
    title: "Enterprise-grade trust",
    description:
      "Zeebe handles millions of stateful process instances over weeks or months with full auditability. A mission-critical process engine with a decade of production hardening, now extended for agents.",
  },
];

export default function Differentiators() {
  return (
    <section id="differentiators" className="border-b border-[#2A2A2A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          What makes our agentic orchestration different
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[#A0A0A0]">
          Four capabilities that no other vendor delivers together.
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8"
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-[#A0A0A0]">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
