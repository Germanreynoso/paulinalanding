import Reveal from "./Reveal";
import Stars from "./Stars";

export default function ExclusiveBenefit() {
  return (
    <section className="section overflow-hidden">
      <Stars density={70} seed={23} className="opacity-70" />
      <div className="glow-center pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />

      <div className="shell relative text-center">
        <Reveal>
          <h2 className="h-section">
            <span className="font-bold">Beneficio exclusivo</span>
            <br />
            <span className="text-thin font-light">por contratación online</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl">
          <p className="eyebrow">Te llevas</p>
          <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-white md:text-2xl">
            Revisión y mejora de perfil actual{" "}
            <span className="text-white/55">+</span> 1 semana de contenido listo
            para usar en tus redes.
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-12 flex justify-center">
          <span className="chip">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
            Oferta de bienvenida / Activa
          </span>
        </Reveal>
      </div>
    </section>
  );
}
