import Reveal from "./Reveal";
import GalleryInteractive from "./GalleryInteractive";

export default function Gallery() {
  return (
    <section id="galeria" className="section">
      <Reveal blur className="shell text-center">
        <h2 className="h-section font-bold">
          ¿Qué pasa cuando
          <br />
          tu proyecto tiene dirección?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          Mejor comunicación, más claridad y contenido que realmente conecta con
          tu público.
        </p>
      </Reveal>

      <GalleryInteractive />

      <Reveal delay={200} className="shell mt-10">
        <p className="font-display text-lg font-medium leading-snug text-white md:text-xl">
          Proyectos que necesitaban
          <br className="hidden sm:block" /> orden, claridad y resultados reales
        </p>
      </Reveal>
    </section>
  );
}
