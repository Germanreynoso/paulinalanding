import Reveal from "./Reveal";

const stats = [
  {
    value: "+40",
    title: "Proyectos realizados",
    desc: "Marcas que mejoraron su comunicación y presencia",
  },
  {
    value: "6",
    title: "Áreas de expertise",
    desc: "Diseño, estrategia audiovisual, pauta, copy y dirección creativa",
  },
  {
    value: "1x",
    title: "Interlocutor para todo",
    desc: "Una agencia entera en un solo punto de contacto",
  },
  {
    value: "45'",
    title: "Primera consulta gratis",
    desc: "Diagnóstico de marca sin costo ni compromiso",
  },
];

export default function Stats() {
  return (
    <section className="relative pb-8">
      <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} className="card flex flex-col">
            <span className="font-display text-5xl font-bold tracking-tight">
              {s.value}
            </span>
            <span className="mt-5 text-[15px] font-medium text-white">
              {s.title}
            </span>
            <span className="mt-2 text-[13px] leading-relaxed text-faint">
              {s.desc}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
