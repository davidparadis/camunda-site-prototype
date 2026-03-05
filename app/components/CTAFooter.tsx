export default function CTAFooter() {
  return (
    <section id="cta" className="bg-[#FF6314] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Ready to orchestrate?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          See how Camunda can help you move AI from pilots to production with the
          trust, governance, and control your operations demand.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0A0A0A]"
        >
          Get a demo
        </a>
      </div>
    </section>
  );
}
