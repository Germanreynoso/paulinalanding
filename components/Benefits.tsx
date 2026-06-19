import Reveal from "./Reveal";

const items = [
  "Qué está fallando en tu marca",
  "Qué mejorar primero",
  "Ideas concretas para aplicar",
  "Una dirección clara para avanzar",
];

export default function Benefits() {
  return (
    <section className="section">
      <div className="shell grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal className="flex flex-col items-center text-center md:items-center">
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="text-thin font-light">¿Qué</span>{" "}
            <span className="font-bold">te llevas?</span>
          </h2>
          <a href="#diagnostico" className="pill pill-outline mt-7 !text-[11px]">
            Quiero mi diagnóstico gratis
          </a>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-line">
            {items.map((it) => (
              <li
                key={it}
                className="py-4 text-[15px] text-white/85 first:pt-0 last:pb-0"
              >
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
