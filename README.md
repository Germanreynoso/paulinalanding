# INNA Estrategia — Landing

Landing page de **INNA Estrategia** (Paulina Umanez) para captar consultas de
diagnóstico de marca. Construida a partir del diseño de Figma y los assets PNG.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 3**
- Tipografías: **Space Grotesk** (display) + **Inter** (cuerpo) vía `next/font`
- Animaciones de entrada con `IntersectionObserver` (sin dependencias extra)
- 100% estático (prerender) — deployable a Vercel o cualquier hosting estático

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Estructura

```
app/
  layout.tsx        # fuentes, metadata, <html lang="es">
  page.tsx          # composición de secciones
  globals.css       # design system (tokens, pills, cards, reveal, focus)
  icon.png          # favicon
components/
  Nav · Hero · Benefits · Stats · Gallery
  ExclusiveBenefit · Diagnostic · DiagnosticForm · Footer
  Reveal.tsx        # wrapper de animación on-scroll
  Stars.tsx         # starfield determinista (seeded, sin hydration mismatch)
lib/
  site.ts           # datos de contacto + helper de WhatsApp
public/
  logo.png · sphere.png · gallery/* · bg/spiral.png
design/source/      # mockups y assets originales de Figma (referencia)
docs/superpowers/specs/  # spec de diseño
```

## Comportamiento

- El formulario de diagnóstico valida (Nombre, Email, Teléfono) y **abre WhatsApp**
  (`wa.me/543815100334`) con el mensaje pre-cargado.
- Teléfono y "Hablemos" → WhatsApp; email → `mailto:`.
- Responsive (desktop → mobile en una columna). Accesible (WCAG AA: contraste,
  labels, foco visible).

## Pendiente

- Reemplazar los **links de redes sociales** (placeholder) en `lib/site.ts` cuando
  estén las URLs reales (hoy se muestran inactivos, no enlazan a nada).
- El selector de idioma `ES | IN` del footer es UI; no hay traducción real aún.
