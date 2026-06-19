import Reveal from "./Reveal";
import { approachTags, whyMe } from "@/lib/content";

export default function Approach() {
  return (
    <section id="enfoque" className="section overflow-hidden">
      <div className="shell">
        {/* Manifiesto */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Enfoque</p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] md:text-5xl">
            Estrategia, percepción y
            <br className="hidden md:block" /> experiencias digitales
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-muted">
            Diseño sistemas de comunicación, branding y experiencias digitales
            orientadas a posicionamiento, diferenciación y comportamiento del
            usuario. Busco las oportunidades donde todavía hay fricción,
            saturación visual o falta de claridad estratégica, para construir
            marcas y productos que se perciban más inteligentes, memorables y
            valiosos.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-white/85">
            No entiendo el diseño como una cuestión estética, sino como una
            herramienta estratégica capaz de organizar percepción, influir en el
            comportamiento y generar experiencias más claras, fluidas y
            memorables.
          </p>
        </Reveal>

        {/* Disciplinas que cruza */}
        <Reveal delay={120} className="mt-12">
          <p className="eyebrow">Donde se cruzan</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {approachTags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Por qué trabajar conmigo */}
        <Reveal delay={160} className="mt-16">
          <h3 className="font-display text-2xl font-bold md:text-3xl">
            ¿Por qué trabajar conmigo?
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Porque combino pensamiento estratégico, sensibilidad visual y lógica
            de sistemas para desarrollar experiencias que no solo se ven bien,
            sino que funcionan de forma inteligente.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whyMe.map((p) => (
              <div key={p.title} className="card">
                <h4 className="font-display text-[16px] font-semibold text-white">
                  {p.title}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-ink-800/40 p-6 md:flex md:items-center md:justify-between md:gap-6 md:p-8">
            <p className="font-display text-lg font-medium leading-snug text-white md:text-xl">
              Si buscás construir una marca o experiencia digital con más
              claridad, intención y posicionamiento estratégico, trabajemos
              juntos.
            </p>
            <a href="#diagnostico" className="pill pill-primary mt-5 shrink-0 md:mt-0">
              Quiero mi diagnóstico gratis
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
