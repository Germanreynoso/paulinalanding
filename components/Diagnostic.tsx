import Image from "next/image";
import DiagnosticForm from "./DiagnosticForm";
import Reveal from "./Reveal";

const deliverables = [
  "Qué está fallando en tu marca",
  "Qué mejorar primero",
  "Ideas concretas para aplicar",
  "Una dirección clave para avanzar",
];

export default function Diagnostic() {
  return (
    <section id="diagnostico" className="section overflow-hidden">
      {/* Spiral constellation backdrop */}
      <Image
        src="/bg/spiral.png"
        alt=""
        aria-hidden
        width={1440}
        height={829}
        className="pointer-events-none absolute -left-1/4 top-1/2 w-[140%] max-w-none
          -translate-y-1/2 opacity-25 md:left-0 md:w-full"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch */}
        <Reveal>
          <p className="eyebrow">Diagnóstico de marca · Gratis</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-[52px]">
            <span className="text-thin font-light">Descubrí qué</span>
            <br />
            <span className="font-bold">está frenando</span>
            <br />
            <span className="font-bold">tu proyecto</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            En una consulta analizamos tu marca y te digo exactamente qué mejorar
            para que empiece a funcionar.
          </p>

          <ul className="mt-8 space-y-3">
            {deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={120}>
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            Tu diagnóstico gratis ahora
          </h3>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
            Completá el formulario y coordinamos una consulta donde analizo tu
            marca y te doy una dirección clara para mejorar.
          </p>
          <div className="mt-7">
            <DiagnosticForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
