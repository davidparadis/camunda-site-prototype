export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          The enterprise platform for{" "}
          <span className="bg-gradient-to-r from-white to-[#A0A0A0] bg-clip-text text-transparent">
            agentic orchestration.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#A0A0A0] md:text-xl">
          A new operating model for the age of AI.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#cta"
            className="rounded-full bg-[#FF6314] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Ready to orchestrate?
          </a>
          <a
            href="#differentiators"
            className="rounded-full border border-[#2A2A2A] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#A0A0A0]"
          >
            See it in action
          </a>
        </div>
      </div>
    </section>
  );
}
