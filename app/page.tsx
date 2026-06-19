import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import ExclusiveBenefit from "@/components/ExclusiveBenefit";
import Diagnostic from "@/components/Diagnostic";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Benefits />
      <Stats />
      <Gallery />
      <ExclusiveBenefit />
      <Diagnostic />
      <Footer />
    </main>
  );
}
