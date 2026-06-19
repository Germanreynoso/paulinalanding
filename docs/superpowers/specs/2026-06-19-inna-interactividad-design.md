# INNA Estrategia — Interactividad (Spec)

**Fecha:** 2026-06-19
**Base:** landing existente (Next.js 16 + Tailwind, static export en Netlify).
**Objetivo de negocio:** aumentar engagement y tiempo en página → más leads.
Tarjetas que revelan más información al tocarlas, stats animados y FAQ.

## Decisiones (aprobadas)
- **Sin dependencias nuevas.** Componentes propios (Modal, Accordion, CountUp) con
  React + CSS. Mantiene bundle chico y compatibilidad con `output: 'export'`.
- **Contenido placeholder editable**, centralizado en `lib/content.ts`.
- **Estilo de interacción:** modal/lightbox para proyectos; expansión inline para
  expertise; count-up + hover/tap para stats; acordeón para FAQ.

## Alcance (4 features)

### 1. Tarjetas de proyectos → Modal
- Cada tile de la galería abre un modal con: imagen grande, nombre, año, tagline,
  descripción ("qué hicimos"), `services[]` (chips), `result` (línea destacada) y
  CTA "Hablemos" → WhatsApp con mensaje pre-cargado del proyecto.
- Cierra con ✕, click en backdrop o `Esc`. Mobile: ocupa casi full-screen.
- A11y: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` al título, foco
  atrapado dentro, scroll del body bloqueado, foco vuelve al tile al cerrar.
- Render vía `createPortal` a `document.body`.

### 2. Stats interactivos
- **Count-up**: el número sube de 0 al valor cuando entra en viewport (una vez).
  Soporta prefijo/sufijo (`+40`, `45'`, `1x`). Respeta `prefers-reduced-motion`
  (muestra el valor final sin animar).
- **Reveal**: hover (desktop) o tap (mobile) despliega una línea de `breakdown`.

### 3. Nueva sección "Áreas de expertise" (después de la galería)
- Grid de 6 tarjetas: Diseño, Estrategia audiovisual, Pauta, Copy, Dirección
  creativa, CGI/3D (editable). Click → expande inline el `detail` (una abierta a
  la vez, altura animada con CSS). Patrón acordeón.
- A11y: cada tarjeta es `<button aria-expanded aria-controls>`; panel con `id`.

### 4. FAQ acordeón (antes del formulario)
- 4-6 `Q/A` (placeholder). Una abierta a la vez, altura animada.
- A11y: igual patrón que expertise (button + aria-expanded + region).

## Arquitectura

### Contenido — `lib/content.ts`
```ts
export type Project = {
  id: string; name: string; year: string; tagline: string;
  image: string; description: string; services: string[]; result: string;
};
export type Expertise = { id: string; title: string; detail: string };
export type Faq = { id: string; q: string; a: string };
export const projects: Project[]; // 5 (CGI, Castelli, Testify, Brutal, AudioVisual)
export const expertise: Expertise[]; // 6
export const faqs: Faq[]; // 4-6
```
Los `stats` (con su `breakdown`) se mantienen definidos en `Stats.tsx`, no se
mueven a `content.ts` (cambian poco y viven con su UI).

### Componentes nuevos (todos client donde haya estado/efectos)
- `components/Modal.tsx` — reutilizable. Props: `open`, `onClose`, `labelledById`,
  `children`. Maneja portal, foco atrapado, `Esc`, scroll-lock, animación
  enter/leave por CSS. Sin estado de negocio adentro.
- `components/CountUp.tsx` — props: `value:number`, `prefix?`, `suffix?`,
  `duration?`. Anima al entrar en viewport (IntersectionObserver), una sola vez.
- `components/Accordion.tsx` — item controlado: `title`, `open`, `onToggle`,
  `children`. Animación de altura. Reutilizado por Expertise y FAQ.
- `components/Expertise.tsx` — sección; estado "índice abierto" (uno a la vez).
- `components/Faq.tsx` — sección; estado "índice abierto".

### Componentes modificados
- `components/Gallery.tsx` — el tile pasa a ser `<button>` que abre el modal con el
  `Project` correspondiente. Estado `selected: Project | null` en un wrapper client
  (`GalleryInteractive`). El contenido (título, subtítulo, caption) sigue server;
  la grilla interactiva se aísla en un componente client.
- `components/Stats.tsx` — la sección sigue server; cada tarjeta se renderiza con
  un sub-componente client `StatCard` que contiene `CountUp` y maneja el reveal
  del `breakdown` (hover en desktop, toggle por tap en mobile).
- `app/page.tsx` — inserta `<Expertise/>` (tras Gallery) y `<Faq/>` (antes de
  Diagnostic).

### Orden final de página
Nav · Hero · Benefits · Stats(count-up) · Gallery(modal) · **Expertise** ·
ExclusiveBenefit · **FAQ** · Diagnostic · Footer.

## Estilos (globals.css)
- Tokens y pills existentes se reutilizan. Agregar: backdrop del modal
  (`bg-black/70 backdrop-blur`), panel del modal (card existente, más grande),
  chips de servicios (reusar `.chip`), transición de altura para acordeón,
  estado abierto/cerrado del modal (opacity + translate/scale).
- Respetar `prefers-reduced-motion` (sin animaciones de count-up/altura/scale).

## Accesibilidad (criterios de aceptación)
- Modal: abrir con teclado, foco entra al panel, `Tab` circula dentro, `Esc`
  cierra, foco vuelve al disparador, `aria-modal` y `aria-labelledby` correctos,
  fondo inerte (scroll bloqueado).
- Acordeones: `aria-expanded` refleja estado, `aria-controls` apunta al panel,
  operable con Enter/Espacio.
- Count-up no rompe lectores (el valor final queda en el DOM).
- Sin overflow horizontal en mobile; contraste AA mantenido.

## Verificación
- Browser (Playwright): abrir/cerrar cada modal (✕, backdrop, `Esc`), foco
  atrapado, expandir/cerrar expertise y FAQ, count-up dispara una vez, sin
  overflow mobile, build `output:export` sirve `out/` sin imágenes rotas.
- Review multi-agente: interacción/UX, a11y de modal y teclado, responsive,
  calidad de código. Aplicar fixes confirmados.
- `npm run build` verde antes de re-deploy.

## Fuera de alcance (YAGNI)
- Framer Motion / shared-element morph (queda como upgrade opcional).
- Filtros/categorías en la galería, paginación, búsqueda.
- CMS / backend para el contenido (sigue en `lib/content.ts`).
- Datos reales de proyectos (placeholder hasta que el cliente los pase).
