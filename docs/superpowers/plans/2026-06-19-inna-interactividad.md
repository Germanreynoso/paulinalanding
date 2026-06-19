# INNA Interactividad — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer la landing más interactiva — modales de proyectos, stats con count-up, sección "Áreas de expertise" expandible y FAQ acordeón — sin dependencias nuevas.

**Architecture:** Componentes client aislados (Modal, CountUp, Accordion, StatCard, GalleryInteractive, Expertise, Faq) montados dentro de secciones server. Contenido centralizado en `lib/content.ts`. Modal vía `createPortal`. Animaciones con CSS (transición de altura por `grid-template-rows`, transición de opacity/scale para el modal). Todo accesible y respetando `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3. Static export (`output: 'export'`). Sin librerías de animación.

## Global Constraints

- **Sin dependencias npm nuevas.** Solo React + CSS.
- **Static export compatible:** nada que requiera servidor en runtime (`output: 'export'`, `images.unoptimized: true` ya configurados).
- **Idioma del contenido:** español (es-AR). Contenido extra = placeholder editable en `lib/content.ts`.
- **WhatsApp:** los CTA usan `whatsappUrl(message?)` de `lib/site.ts` (número `543815100334`).
- **Accesibilidad WCAG AA:** modal con foco atrapado + `Esc` + scroll-lock + `aria-modal`; acordeones con `aria-expanded`/`aria-controls`; foco visible (ya existe regla global `:focus-visible`).
- **Reduced motion:** toda animación nueva debe anularse bajo `@media (prefers-reduced-motion: reduce)`.
- **Verificación (no hay test-runner):** cada tarea se valida con `npm run build` (typecheck+compile) y/o un chequeo de comportamiento en browser con Playwright (`browser_evaluate`) con salida esperada, y termina con commit.
- **Imports:** alias `@/` apunta a la raíz (configurado en tsconfig).

## File Structure

**Crear:**
- `lib/content.ts` — tipos + datos (`projects`, `expertise`, `faqs`) + `projectWhatsappUrl()`.
- `components/CountUp.tsx` — número animado al entrar en viewport.
- `components/StatCard.tsx` — tarjeta de stat (CountUp + reveal de breakdown).
- `components/Modal.tsx` — modal accesible reutilizable (portal, focus trap, Esc, scroll-lock).
- `components/GalleryInteractive.tsx` — grid de proyectos (tiles = botones) + modal de detalle.
- `components/Accordion.tsx` — item de acordeón controlado (button + panel animado).
- `components/Expertise.tsx` — sección "Áreas de expertise" (grid expandible, una abierta).
- `components/Faq.tsx` — sección FAQ (acordeón, una abierta).
- `components/Approach.tsx` — sección "Enfoque estratégico" (manifiesto + tags + por qué trabajar conmigo + CTA). Contenido real del cliente.

**Modificar:**
- `components/Gallery.tsx` — header/caption server + `<GalleryInteractive/>` para la grilla.
- `components/Stats.tsx` — usa `StatCard`; agrega `breakdown` a cada stat.
- `app/page.tsx` — inserta `<Expertise/>` (tras Gallery) y `<Faq/>` (antes de Diagnostic).
- `app/globals.css` — estilos de modal, acordeón, reveal de stats, reduced-motion.

---

### Task 1: Modelo de contenido (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`

**Interfaces:**
- Consumes: `whatsappUrl` de `lib/site.ts`.
- Produces:
  - `type Project = { id: string; name: string; year: string; tagline: string; image: string; description: string; services: string[]; result: string }`
  - `type Expertise = { id: string; title: string; detail: string }`
  - `type Faq = { id: string; q: string; a: string }`
  - `const projects: Project[]` (5: cgi, castelli, testify, brutal, audiovisual)
  - `const expertise: Expertise[]` (6, contenido real)
  - `const faqs: Faq[]` (5)
  - `type Pillar = { title: string; detail: string }`
  - `const approachTags: string[]` (8)
  - `const whyMe: Pillar[]` (3)
  - `function projectWhatsappUrl(p: Project): string`

- [ ] **Step 1: Crear `lib/content.ts` con tipos, datos y helper**

```ts
import { whatsappUrl } from "@/lib/site";

export type Project = {
  id: string;
  name: string;
  year: string;
  tagline: string;
  image: string;
  description: string;
  services: string[];
  result: string;
};

export type Expertise = { id: string; title: string; detail: string };

export type Faq = { id: string; q: string; a: string };

// Contenido placeholder — editable. Reemplazar por datos reales de cada proyecto.
export const projects: Project[] = [
  {
    id: "cgi",
    name: "CGI Group",
    year: "2024",
    tagline: "Identidad visual y dirección creativa",
    image: "/gallery/cgi.png",
    description:
      "Ordenamos la presencia digital de la marca y definimos una dirección visual coherente para todos sus canales, con piezas listas para producir.",
    services: ["Branding", "Dirección creativa", "CGI / 3D"],
    result: "Comunicación más clara y consistente en cada punto de contacto.",
  },
  {
    id: "castelli",
    name: "Castelli Group",
    year: "2024",
    tagline: "Estrategia de marca y contenido editorial",
    image: "/gallery/castelli.png",
    description:
      "Definimos el tono y la línea editorial, y produjimos contenido que transmite autoridad y cercanía a la vez.",
    services: ["Estrategia", "Copy", "Fotografía"],
    result: "Una marca que se percibe profesional y confiable.",
  },
  {
    id: "testify",
    name: "The Training Center",
    year: "2023",
    tagline: "Campaña audiovisual — Testify",
    image: "/gallery/testify.png",
    description:
      "Dirigimos y produjimos la campaña audiovisual del centro, con un relato que conecta esfuerzo y resultado.",
    services: ["Dirección audiovisual", "Producción", "Edición"],
    result: "Más alcance y consultas en los lanzamientos.",
  },
  {
    id: "brutal",
    name: "Brutal",
    year: "2023",
    tagline: "Campaña deportiva y arte de marca",
    image: "/gallery/brutal.png",
    description:
      "Construimos el universo visual de la campaña, combinando fotografía, color y dirección de arte con identidad propia.",
    services: ["Dirección de arte", "Pauta", "Contenido"],
    result: "Una campaña con identidad fuerte y memorable.",
  },
  {
    id: "audiovisual",
    name: "The AudioVisual Dream Studio",
    year: "2023",
    tagline: "Marca y posicionamiento de estudio",
    image: "/gallery/audiovisual.png",
    description:
      "Definimos la identidad del estudio y su narrativa, con piezas que muestran su forma de trabajar.",
    services: ["Branding", "Dirección creativa", "Contenido"],
    result: "Posicionamiento claro frente a su competencia.",
  },
];

// Contenido real (provisto por el cliente — "QUÉ DESARROLLO", curado en 6 áreas).
export const expertise: Expertise[] = [
  {
    id: "branding",
    title: "Branding & Posicionamiento",
    detail:
      "Construcción de marcas con posicionamiento claro y alto valor percibido, con dirección creativa y conceptual para experiencias digitales.",
  },
  {
    id: "uxui",
    title: "UX/UI & Experiencia",
    detail:
      "UX/UI orientado a claridad, percepción y conversión. Estructuro experiencias más intuitivas y coherentes, optimizando recorridos y lógica de interacción.",
  },
  {
    id: "estrategia",
    title: "Estrategia & Comunicación",
    detail:
      "Estrategias de comunicación para productos, software y marcas, con sistemas de contenido y comunicación escalables.",
  },
  {
    id: "sistemas",
    title: "Sistemas visuales & digitales",
    detail:
      "Sistemas visuales y digitales diseñados para reducir la carga cognitiva: menos ruido, más claridad.",
  },
  {
    id: "narrativa",
    title: "Narrativa visual & Storytelling",
    detail:
      "Storytelling y narrativa visual aplicada a branding y tecnología, para que la marca se entienda y se recuerde.",
  },
  {
    id: "producto",
    title: "Producto & Automatización",
    detail:
      "Decisiones de estructura de producto, automatización y sistemas de interacción para que todo funcione de forma más inteligente.",
  },
];

export const faqs: Faq[] = [
  {
    id: "que-es",
    q: "¿Qué incluye el diagnóstico gratis?",
    a: "Una consulta de 45' donde reviso tu marca y te digo qué está fallando, qué mejorar primero y una dirección clara para avanzar. Sin costo ni compromiso.",
  },
  {
    id: "tiempo",
    q: "¿En cuánto tiempo respondés?",
    a: "Respondo en menos de 24 hs hábiles desde que dejás tus datos.",
  },
  {
    id: "trabajo",
    q: "¿Cómo es trabajar con INNA?",
    a: "Un solo interlocutor para todo: estrategia, diseño, audiovisual y dirección creativa. Sin pasar por mil personas.",
  },
  {
    id: "online",
    q: "¿Trabajás online o presencial?",
    a: "Trabajo online con marcas de cualquier ciudad. Por contratación online tenés además un beneficio de bienvenida.",
  },
  {
    id: "rubros",
    q: "¿Con qué rubros trabajás?",
    a: "Con marcas de distintos rubros que necesitan orden, claridad y contenido que conecte. Si tenés dudas, escribime y lo vemos.",
  },
];

export type Pillar = { title: string; detail: string };

// Sección "Enfoque estratégico" (contenido real del cliente).
export const approachTags: string[] = [
  "Estrategia",
  "Tecnología",
  "Branding",
  "UX/UI",
  "Comportamiento humano",
  "Automatización",
  "Narrativa visual",
  "Sistemas digitales",
];

export const whyMe: Pillar[] = [
  {
    title: "Pensamiento estratégico",
    detail:
      "Detecto fricción, saturación visual y falta de claridad para construir marcas que se perciban más inteligentes y valiosas.",
  },
  {
    title: "Sensibilidad visual",
    detail:
      "El diseño no como estética, sino como herramienta para organizar percepción e influir en el comportamiento.",
  },
  {
    title: "Lógica de sistemas",
    detail:
      "Estructuras digitales y marcas que reducen fricción, generan diferenciación real y construyen percepción sólida a largo plazo.",
  },
];

/** wa.me link con un mensaje pre-cargado referido a un proyecto puntual. */
export function projectWhatsappUrl(p: Project): string {
  return whatsappUrl(
    `¡Hola Paulina! Vi el proyecto "${p.name}" y quiero algo así para mi marca.`
  );
}
```

- [ ] **Step 2: Verificar compilación**

Run: `npm run build`
Expected: build OK, sin errores de TypeScript (el módulo compila; aún no se usa).

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat(content): modelo de contenido (projects, expertise, faqs)"
```

---

### Task 2: Stats interactivos (CountUp + StatCard + breakdown)

**Files:**
- Create: `components/CountUp.tsx`
- Create: `components/StatCard.tsx`
- Modify: `components/Stats.tsx`
- Modify: `app/globals.css` (estilos `.stat-*`)

**Interfaces:**
- Produces:
  - `CountUp` props: `{ value: number; prefix?: string; suffix?: string; durationMs?: number; className?: string }`
  - `StatCard` props: `{ value: number; prefix?: string; suffix?: string; title: string; desc: string; breakdown: string }`

- [ ] **Step 1: Crear `components/CountUp.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1400,
  className = "",
}: Props) {
  // SSR y primer render del cliente arrancan en 0 (sin hydration mismatch).
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (done.current) return;
      done.current = true;
      if (reduce) {
        setDisplay(value);
        return;
      }
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / durationMs, 1);
        setDisplay(Math.round(easeOutCubic(p) * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Crear `components/StatCard.tsx`**

```tsx
"use client";

import { useState } from "react";
import CountUp from "./CountUp";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  desc: string;
  breakdown: string;
};

export default function StatCard({
  value,
  prefix,
  suffix,
  title,
  desc,
  breakdown,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      className="stat-card group card flex flex-col text-left"
    >
      <span className="font-display text-5xl font-bold tracking-tight">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </span>
      <span className="mt-5 text-[15px] font-medium text-white">{title}</span>
      <span className="mt-2 text-[13px] leading-relaxed text-faint">{desc}</span>

      <span
        className={`stat-breakdown text-[12px] leading-relaxed text-muted ${
          open ? "is-open" : ""
        }`}
      >
        <span className="block pt-3">{breakdown}</span>
      </span>
    </button>
  );
}
```

- [ ] **Step 3: Modificar `components/Stats.tsx` para usar StatCard + breakdown**

Reemplazar el contenido completo por:

```tsx
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
```

- [ ] **Step 4: Agregar estilos en `app/globals.css`**

Agregar dentro de `@layer components` (después de `.card`):

```css
  /* Stat card: reveal del breakdown (hover en desktop, tap/estado en mobile) */
  .stat-card {
    cursor: pointer;
  }
  .stat-breakdown {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition:
      grid-template-rows 0.35s ease,
      opacity 0.35s ease;
  }
  .stat-breakdown > span {
    overflow: hidden;
  }
  .stat-card:hover .stat-breakdown,
  .stat-card:focus-visible .stat-breakdown,
  .stat-breakdown.is-open {
    grid-template-rows: 1fr;
    opacity: 1;
  }
```

Y en el bloque `@media (prefers-reduced-motion: reduce)` agregar:

```css
  .stat-breakdown {
    transition: none;
  }
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build OK sin errores.

- [ ] **Step 6: Verificar comportamiento en browser**

Run: `npm run dev` (background), navegar a `http://localhost:3000`.
Evaluar (tras scrollear a la sección de stats):

```js
async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const card = document.querySelector('.stat-card');
  card.scrollIntoView(); await sleep(1800);
  const number = document.querySelector('.stat-card .font-display').textContent;
  card.click(); await sleep(400);
  const open = card.getAttribute('aria-expanded');
  return { number, open };
}
```
Expected: `number` muestra el valor final (ej. `"+40"`, no `"+0"`); `open === "true"` tras el click.

- [ ] **Step 7: Commit**

```bash
git add components/CountUp.tsx components/StatCard.tsx components/Stats.tsx app/globals.css
git commit -m "feat(stats): count-up animado y reveal de breakdown"
```

---

### Task 3: Modal accesible + galería de proyectos con detalle

**Files:**
- Create: `components/Modal.tsx`
- Create: `components/GalleryInteractive.tsx`
- Modify: `components/Gallery.tsx`
- Modify: `app/globals.css` (estilos `.modal-*`)

**Interfaces:**
- Consumes: `projects`, `projectWhatsappUrl` de `lib/content.ts`.
- Produces:
  - `Modal` props: `{ open: boolean; onClose: () => void; labelledById?: string; children: React.ReactNode; className?: string }`

- [ ] **Step 1: Crear `components/Modal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledById?: string;
  children: React.ReactNode;
  className?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  open,
  onClose,
  labelledById,
  children,
  className = "",
}: Props) {
  const [mounted, setMounted] = useState(false); // portal solo en cliente
  const [render, setRender] = useState(open); // mantener montado durante salida
  const [visible, setVisible] = useState(false); // clase para transición
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Enter/leave
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      setRender(true);
      const r = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(r);
    }
    setVisible(false);
    const t = setTimeout(() => setRender(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  // Scroll lock + foco inicial + foco de retorno
  useEffect(() => {
    if (!render) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
      lastFocused.current?.focus?.();
    };
  }, [render]);

  // Esc + focus trap
  useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const items = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((el) => el.offsetParent !== null);
        if (items.length === 0) {
          e.preventDefault();
          panel.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === panel)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [render, onClose]);

  if (!mounted || !render) return null;

  return createPortal(
    <div
      className="modal-overlay"
      data-visible={visible}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        tabIndex={-1}
        className={`modal-panel ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
```

- [ ] **Step 2: Crear `components/GalleryInteractive.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import { projects, projectWhatsappUrl, type Project } from "@/lib/content";

export default function GalleryInteractive() {
  const [selected, setSelected] = useState<Project | null>(null);

  const layout: Record<string, string> = {
    cgi: "md:row-span-2",
  };

  return (
    <>
      <div
        className="shell mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3
          md:grid-rows-2 md:h-[660px]"
      >
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(p)}
            aria-label={`Ver proyecto ${p.name}`}
            className={`group relative h-72 overflow-hidden rounded-2xl border border-line
              text-left md:h-auto ${layout[p.id] ?? ""}`}
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-display text-[11px] uppercase tracking-[0.18em] text-white/85">
              {p.name}
            </span>
            <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              +
            </span>
          </button>
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        labelledById="project-modal-title"
        className="modal-panel--project"
      >
        {selected && (
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="modal-close"
            >
              ✕
            </button>

            <div className="mt-6">
              <p className="eyebrow">{selected.year}</p>
              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl font-bold md:text-3xl"
              >
                {selected.name}
              </h3>
              <p className="mt-1 text-[14px] text-muted">{selected.tagline}</p>

              <p className="mt-5 text-[15px] leading-relaxed text-white/85">
                {selected.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.services.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-[14px] text-muted">
                <span className="text-white/80">Resultado:</span> {selected.result}
              </p>

              <a
                href={projectWhatsappUrl(selected)}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-primary mt-7"
              >
                Quiero algo así
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
```

- [ ] **Step 3: Modificar `components/Gallery.tsx`** (header/caption server + grid interactivo)

Reemplazar el contenido completo por:

```tsx
import Reveal from "./Reveal";
import GalleryInteractive from "./GalleryInteractive";

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
```

- [ ] **Step 4: Agregar estilos de modal en `app/globals.css`**

Agregar dentro de `@layer components`:

```css
  /* Modal -------------------------------------------------------------- */
  .modal-overlay {
    @apply fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto
      p-4 md:p-8;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px);
    opacity: 0;
    transition: opacity 0.22s ease;
  }
  .modal-overlay[data-visible="true"] {
    opacity: 1;
  }
  .modal-panel {
    @apply relative my-auto w-full max-w-lg rounded-2xl p-6 md:p-8;
    background: linear-gradient(155deg, #17171b 0%, #0c0c0e 100%);
    border: 1px solid rgba(255, 255, 255, 0.09);
    transform: translateY(12px) scale(0.98);
    opacity: 0;
    transition:
      transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.24s ease;
  }
  .modal-overlay[data-visible="true"] .modal-panel {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  .modal-panel--project {
    @apply max-w-2xl;
  }
  .modal-close {
    @apply absolute right-4 top-4 flex h-9 w-9 items-center justify-center
      rounded-full text-white;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .modal-close:hover {
    background: rgba(0, 0, 0, 0.75);
  }
```

Y en el bloque `@media (prefers-reduced-motion: reduce)`:

```css
  .modal-overlay,
  .modal-panel {
    transition: none;
  }
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build OK; ruta `/` sigue estática.

- [ ] **Step 6: Verificar comportamiento en browser**

Run: `npm run dev` (background), navegar a `http://localhost:3000`.
Evaluar:

```js
async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  document.querySelector('#galeria button').click();
  await sleep(350);
  const dialog = document.querySelector('[role=dialog]');
  const titled = document.getElementById('project-modal-title')?.textContent;
  const bodyLocked = getComputedStyle(document.body).overflow === 'hidden';
  // cerrar con Esc
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  await sleep(350);
  const closed = !document.querySelector('[role=dialog]');
  const bodyRestored = getComputedStyle(document.body).overflow !== 'hidden';
  return { hadDialog: !!dialog, titled, bodyLocked, closed, bodyRestored };
}
```
Expected: `hadDialog === true`, `titled` con el nombre del proyecto, `bodyLocked === true`, `closed === true`, `bodyRestored === true`.

- [ ] **Step 7: Commit**

```bash
git add components/Modal.tsx components/GalleryInteractive.tsx components/Gallery.tsx app/globals.css
git commit -m "feat(gallery): modal accesible con detalle de proyecto"
```

---

### Task 4: Acordeón + sección "Áreas de expertise"

**Files:**
- Create: `components/Accordion.tsx`
- Create: `components/Expertise.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css` (estilos `.accordion-*`)

**Interfaces:**
- Consumes: `expertise` de `lib/content.ts`.
- Produces:
  - `Accordion` props: `{ id: string; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }`

- [ ] **Step 1: Crear `components/Accordion.tsx`**

```tsx
"use client";

type Props = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function Accordion({ id, title, open, onToggle, children }: Props) {
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        id={`acc-btn-${id}`}
        aria-expanded={open}
        aria-controls={`acc-panel-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-[17px] font-medium text-white md:text-lg">
          {title}
        </span>
        <span
          aria-hidden
          className="accordion-icon text-xl text-muted"
          data-open={open}
        >
          +
        </span>
      </button>
      <div
        id={`acc-panel-${id}`}
        role="region"
        aria-labelledby={`acc-btn-${id}`}
        className="accordion-panel"
        data-open={open}
      >
        <div className="accordion-inner">
          <div className="pb-5 pr-8 text-[15px] leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Crear `components/Expertise.tsx`**

```tsx
"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Accordion from "./Accordion";
import { expertise } from "@/lib/content";

export default function Expertise() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="expertise" className="section">
      <Reveal className="shell text-center">
        <p className="eyebrow">Áreas de expertise</p>
        <h2 className="h-section mt-4 font-bold">
          Todo lo que tu marca
          <br />
          necesita, en un solo lugar
        </h2>
      </Reveal>

      <Reveal delay={120} className="shell mt-12 grid gap-x-12 md:grid-cols-2">
        {expertise.map((e) => (
          <Accordion
            key={e.id}
            id={e.id}
            title={e.title}
            open={openId === e.id}
            onToggle={() => setOpenId((cur) => (cur === e.id ? null : e.id))}
          >
            {e.detail}
          </Accordion>
        ))}
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Insertar `<Expertise/>` en `app/page.tsx`** (después de `<Gallery/>`)

Modificar imports y JSX:

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import Expertise from "@/components/Expertise";
import ExclusiveBenefit from "@/components/ExclusiveBenefit";
import Diagnostic from "@/components/Diagnostic";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Benefits />
      <Stats />
      <Gallery />
      <Expertise />
      <ExclusiveBenefit />
      <Diagnostic />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Agregar estilos de acordeón en `app/globals.css`** (dentro de `@layer components`)

```css
  /* Accordion ---------------------------------------------------------- */
  .accordion-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .accordion-panel[data-open="true"] {
    grid-template-rows: 1fr;
  }
  .accordion-inner {
    overflow: hidden;
  }
  .accordion-icon {
    transition: transform 0.3s ease;
  }
  .accordion-icon[data-open="true"] {
    transform: rotate(45deg);
  }
```

Y en el bloque `@media (prefers-reduced-motion: reduce)`:

```css
  .accordion-panel,
  .accordion-icon {
    transition: none;
  }
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 6: Verificar comportamiento en browser**

Navegar a `http://localhost:3000`, evaluar:

```js
async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const btns = document.querySelectorAll('#expertise button[aria-controls]');
  btns[0].click(); await sleep(450);
  const firstOpen = btns[0].getAttribute('aria-expanded');
  btns[1].click(); await sleep(450);
  const firstClosed = btns[0].getAttribute('aria-expanded');
  const secondOpen = btns[1].getAttribute('aria-expanded');
  return { count: btns.length, firstOpen, firstClosed, secondOpen };
}
```
Expected: `count === 6`, `firstOpen === "true"`, luego `firstClosed === "false"` y `secondOpen === "true"` (una abierta a la vez).

- [ ] **Step 7: Commit**

```bash
git add components/Accordion.tsx components/Expertise.tsx app/page.tsx app/globals.css
git commit -m "feat(expertise): seccion de areas de expertise con acordeon"
```

---

### Task 5: Sección FAQ (acordeón)

**Files:**
- Create: `components/Faq.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `faqs` de `lib/content.ts`; `Accordion` de Task 4.

- [ ] **Step 1: Crear `components/Faq.tsx`**

```tsx
"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Accordion from "./Accordion";
import { faqs } from "@/lib/content";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="section">
      <Reveal className="shell text-center">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 className="h-section mt-4 font-bold">¿Tenés dudas?</h2>
      </Reveal>

      <Reveal delay={120} className="shell mx-auto mt-12 max-w-2xl">
        {faqs.map((f) => (
          <Accordion
            key={f.id}
            id={f.id}
            title={f.q}
            open={openId === f.id}
            onToggle={() => setOpenId((cur) => (cur === f.id ? null : f.id))}
          >
            {f.a}
          </Accordion>
        ))}
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Insertar `<Faq/>` en `app/page.tsx`** (antes de `<Diagnostic/>`)

Agregar el import `import Faq from "@/components/Faq";` y colocar `<Faq />` entre `<ExclusiveBenefit />` y `<Diagnostic />`:

```tsx
      <ExclusiveBenefit />
      <Faq />
      <Diagnostic />
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar comportamiento en browser**

Navegar a `http://localhost:3000`, evaluar:

```js
async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const btns = document.querySelectorAll('#faq button[aria-controls]');
  const firstInitiallyOpen = btns[0].getAttribute('aria-expanded');
  btns[2].click(); await sleep(450);
  const thirdOpen = btns[2].getAttribute('aria-expanded');
  const firstNowClosed = btns[0].getAttribute('aria-expanded');
  return { count: btns.length, firstInitiallyOpen, thirdOpen, firstNowClosed };
}
```
Expected: `count === 5`, `firstInitiallyOpen === "true"` (la primera abierta por defecto), `thirdOpen === "true"`, `firstNowClosed === "false"`.

- [ ] **Step 5: Commit**

```bash
git add components/Faq.tsx app/page.tsx
git commit -m "feat(faq): seccion de preguntas frecuentes"
```

---

### Task 6: Sección "Enfoque estratégico" (Approach)

**Files:**
- Create: `components/Approach.tsx`
- Modify: `app/page.tsx` (insertar `<Approach/>` tras `<Expertise/>`)

**Interfaces:**
- Consumes: `approachTags`, `whyMe` de `lib/content.ts`.

- [ ] **Step 1: Crear `components/Approach.tsx`**

```tsx
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
```

- [ ] **Step 2: Insertar `<Approach/>` en `app/page.tsx`** (entre `<Expertise/>` y `<ExclusiveBenefit/>`)

Agregar `import Approach from "@/components/Approach";` y dejar la composición final así:

```tsx
      <Gallery />
      <Expertise />
      <Approach />
      <ExclusiveBenefit />
      <Faq />
      <Diagnostic />
      <Footer />
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 4: Verificar en browser**

Navegar a `http://localhost:3000`, evaluar:

```js
() => {
  const sec = document.getElementById('enfoque');
  const tags = sec.querySelectorAll('.chip').length;
  const cards = sec.querySelectorAll('.card').length;
  return { exists: !!sec, tags, cards };
}
```
Expected: `exists === true`, `tags === 8`, `cards === 3`.

- [ ] **Step 5: Commit**

```bash
git add components/Approach.tsx app/page.tsx
git commit -m "feat(enfoque): seccion de posicionamiento estrategico"
```

---

### Task 7: Verificación integral, review y deploy

**Files:** ninguno nuevo (correcciones según hallazgos).

- [ ] **Step 1: Build de producción (static export)**

Run: `npm run build`
Expected: build OK; `out/` generado con `index.html`.

- [ ] **Step 2: Servir `out/` y verificar en browser (desktop + mobile)**

Servir `out/` (`python -m http.server 4000 --directory out` o equivalente).
Verificar en 1440px y 390px:
- Modales abren/cierran (✕, backdrop, `Esc`), foco atrapado, sin scroll de fondo.
- Stats hacen count-up una vez; breakdown se revela.
- Expertise y FAQ expanden una a la vez.
- Sin overflow horizontal en mobile (`document.documentElement.scrollWidth <= window.innerWidth`).
- 0 imágenes rotas (`Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0)`).

- [ ] **Step 3: Review multi-agente**

Lanzar un Workflow de review adversarial sobre el diff (dimensiones: interacción/UX, accesibilidad de modal y teclado, responsive, calidad de código). Aplicar los hallazgos confirmados.

- [ ] **Step 4: Re-build tras fixes**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 5: Commit final + merge + push**

```bash
git add -A
git commit -m "chore(interactividad): fixes de review y verificacion"
git checkout main
git merge feat/interactividad
git push origin main
```
Netlify re-deploya automáticamente desde `main`.

---

## Self-Review

**1. Cobertura del spec:**
- Modal de proyectos → Task 3 ✓
- Stats count-up + breakdown → Task 2 ✓
- Sección Expertise expandible (contenido real "QUÉ DESARROLLO") → Tasks 1, 4 ✓
- FAQ acordeón → Task 5 ✓
- Sección "Enfoque estratégico" (manifiesto + tags + por qué trabajar conmigo) con contenido real del cliente → Tasks 1, 6 ✓
- Contenido centralizado en `lib/content.ts` → Task 1 ✓
- Orden de página (Expertise tras Gallery, Enfoque, FAQ antes de Diagnostic) → Tasks 4, 5, 6 ✓
- Accesibilidad (focus trap, Esc, scroll-lock, aria-expanded/controls) → Tasks 3 y 4 ✓
- prefers-reduced-motion → Tasks 2, 3, 4 ✓
- Verificación browser + review → Task 6 ✓
- Sin dependencias nuevas → todas las tareas usan solo React/CSS ✓

**2. Placeholders:** sin "TODO/TBD"; todo el código está completo. El contenido de `content.ts` es placeholder *de producto* (intencional, editable por el cliente), no un placeholder de plan.

**3. Consistencia de tipos:** `Project`/`Expertise`/`Faq`, `projects`/`expertise`/`faqs`, `projectWhatsappUrl(p: Project)` definidos en Task 1 y usados con la misma firma en Tasks 3/4/5. Props de `Modal`, `CountUp`, `StatCard`, `Accordion` consistentes entre definición y uso.
