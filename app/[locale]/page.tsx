import { setRequestLocale } from "next-intl/server";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Problem from "../components/Problem";
import Differentiators from "../components/Differentiators";
import Competitive from "../components/Competitive";
import Proof from "../components/Proof";
import CTAFooter from "../components/CTAFooter";
import Footer from "../components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Problem />
        <Differentiators />
        <Competitive />
        <Proof />
        <CTAFooter />
      </main>
      <Footer />
    </>
  );
}
