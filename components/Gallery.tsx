import Image from "next/image";
import Reveal from "./Reveal";

type Tile = {
  src: string;
  label: string;
  alt: string;
  className: string; // grid placement (md+)
};

const tiles: Tile[] = [
  {
    src: "/gallery/cgi.png",
    label: "CGI Group",
    alt: "Proyecto CGI Group — tablet y lápiz digital",
    className: "md:row-span-2",
  },
  {
    src: "/gallery/castelli.png",
    label: "Castelli Group",
    alt: "Proyecto Castelli Group — retrato editorial",
    className: "",
  },
  {
    src: "/gallery/testify.png",
    label: "The Training Center",
    alt: "Proyecto The Training Center — Testify",
    className: "",
  },
  {
    src: "/gallery/brutal.png",
    label: "Brutal",
    alt: "Proyecto Brutal — campaña deportiva",
    className: "",
  },
  {
    src: "/gallery/audiovisual.png",
    label: "The AudioVisual Dream Studio",
    alt: "Proyecto The AudioVisual Dream Studio",
    className: "",
  },
];

export default function Gallery() {
  return (
    <section id="galeria" className="section">
      <Reveal className="shell text-center">
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

      <Reveal
        delay={120}
        className="shell mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3
          md:grid-rows-2 md:h-[660px]"
      >
        {tiles.map((t) => (
          <figure
            key={t.src}
            className={`group relative h-72 overflow-hidden rounded-2xl border border-line
              md:h-auto ${t.className}`}
          >
            <Image
              src={t.src}
              alt={t.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 font-display text-[11px]
              uppercase tracking-[0.18em] text-white/85">
              {t.label}
            </figcaption>
          </figure>
        ))}
      </Reveal>

      <Reveal delay={200} className="shell mt-10">
        <p className="font-display text-lg font-medium leading-snug text-white md:text-xl">
          Proyectos que necesitaban
          <br className="hidden sm:block" /> orden, claridad y resultados reales
        </p>
      </Reveal>
    </section>
  );
}
