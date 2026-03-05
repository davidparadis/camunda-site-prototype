import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Problem from "./components/Problem";
import Differentiators from "./components/Differentiators";
import Competitive from "./components/Competitive";
import Proof from "./components/Proof";
import CTAFooter from "./components/CTAFooter";
import Footer from "./components/Footer";

export default function Home() {
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
