import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import CardSpotlight from "@/components/CardSpotlight";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import Expertise from "@/components/Expertise";
import Approach from "@/components/Approach";
import ExclusiveBenefit from "@/components/ExclusiveBenefit";
import Faq from "@/components/Faq";
import Diagnostic from "@/components/Diagnostic";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <CardSpotlight />
      <Nav />
      <Hero />
      <Benefits />
      <Stats />
      <Gallery />
      <Expertise />
      <Approach />
      <ExclusiveBenefit />
      <Faq />
      <Diagnostic />
      <Footer />
    </main>
  );
}
