import Reveal from "./Reveal";
import StatCard from "./StatCard";

const stats = [
  {
    value: 40,
    prefix: "+",
    title: "Proyectos realizados",
    desc: "Marcas que mejoraron su comunicación y presencia",
    breakdown: "Branding, audiovisual, pauta y dirección creativa.",
  },
  {
    value: 6,
    title: "Áreas de expertise",
    desc: "Diseño, estrategia audiovisual, pauta, copy y dirección creativa",
    breakdown: "Diseño · Audiovisual · Pauta · Copy · Dirección · CGI.",
  },
  {
    value: 1,
    suffix: "x",
    title: "Interlocutor para todo",
    desc: "Una agencia entera en un solo punto de contacto",
    breakdown: "Hablás con una sola persona, de principio a fin.",
  },
  {
    value: 45,
    suffix: "'",
    title: "Primera consulta gratis",
    desc: "Diagnóstico de marca sin costo ni compromiso",
    breakdown: "45 minutos enfocados en qué mejorar primero.",
  },
];

export default function Stats() {
  return (
    <section className="relative pb-8">
      <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <StatCard
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              title={s.title}
              desc={s.desc}
              breakdown={s.breakdown}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
