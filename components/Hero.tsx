import Stars from "./Stars";
import HeroSphere from "./HeroSphere";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <Stars density={90} seed={11} />
      <div className="glow-tr pointer-events-none absolute inset-0" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="eyebrow">Creative Strategy · Design · Acting</p>

          <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.04] md:text-[58px]">
            ¿Tu marca no está{" "}
            <span className="text-white">funcionando</span>{" "}
            <span className="text-thin font-light">como</span>{" "}
            <span className="text-white">debería?</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            En una consulta te digo qué está fallando y qué hacer para mejorar tu
            contenido, tu imagen y tus resultados.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#diagnostico" className="pill pill-primary">
              Quiero mi diagnóstico gratis
            </a>
            <a href="#galeria" className="pill pill-outline">
              Ver como trabajo
            </a>
          </div>
        </div>

        {/* Sphere (WebGL con fallback al PNG) */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <div className="glow-center absolute inset-0 scale-110" />
          <HeroSphere />
        </div>
      </div>
    </section>
  );
}
