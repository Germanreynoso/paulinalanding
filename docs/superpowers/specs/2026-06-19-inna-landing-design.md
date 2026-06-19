# INNA Estrategia — Landing Page (Spec)

**Fecha:** 2026-06-19
**Cliente:** Paulina Umanez (INNA founder)
**Fuente de diseño:** `desktop.png` (mockup full desktop, 1441×3995) + assets PNG.

## Objetivo de negocio
Captar leads de marcas que necesitan estrategia/contenido. CTA principal:
"Quiero mi diagnóstico gratis" → conversación por WhatsApp.

## Stack
- **Next.js (App Router) + TypeScript + Tailwind CSS v3.** Una ruta (`/`), estática.
- Tipografías vía `next/font/google`: **Space Grotesk** (display/números) + **Inter** (cuerpo).
- Animaciones de entrada: `IntersectionObserver` + CSS (sin dependencias extra).
- Deploy target: Vercel (o cualquier hosting estático).

## Paleta
- Fondo: `#000` → `#070708`.
- Cards: gradiente `#16161a → #0d0d0f`, borde `rgba(255,255,255,.08)`.
- Texto: títulos `#fff`, cuerpo `#9a9aa0` / muted `#6e6e75`.
- CTA primario: pill gradiente plata (`#e9e9ec → #b8b8bf`) con texto oscuro.
- CTA secundario: outline `rgba(255,255,255,.25)`.
- Glow radial gris claro arriba-derecha del hero; starfield CSS.

## Secciones (orden vertical, fiel al mockup)
1. **Nav** — logo `public/logo.png` + pill "Quiero mi diagnóstico gratis".
2. **Hero** — eyebrow "CREATIVE STRATEGY · DESIGN · ACTING"; H1 "¿Tu marca no está
   funcionando como debería?"; subtítulo; CTA primario + "VER COMO TRABAJO";
   esfera wireframe `public/sphere.png` a la derecha con glow.
3. **¿Qué te llevas?** — 4 bullets: Qué está fallando en tu marca / Qué mejorar
   primero / Ideas concretas para aplicar / Una dirección clara para avanzar.
4. **Stats** — 4 cards: `+40` Proyectos realizados · `6` Áreas de expertise ·
   `1x` Interlocutor para todo · `45'` Primera consulta gratis (con subtexto c/u).
5. **Galería "¿Qué pasa cuando tu proyecto tiene dirección?"** — grid 3 col;
   izquierda alta `cgi.png` (CGI GROUP); `castelli.png` (CASTELLI GROUP);
   `testify.png` (THE TRAINING CENTER); `brutal.png` (BRUTAL);
   `audiovisual.png` (THE AUDIOVISUAL DREAM STUDIO). Caption: "Proyectos que
   necesitaban orden, claridad y resultados reales".
6. **Beneficio exclusivo** — "por contratación online"; bloque "TE LLEVAS:
   Revisión y mejora de perfil actual + 1 semana de contenido listo para usar en
   tus redes."; chip "OFERTA DE BIENVENIDA / ACTIVA".
7. **Diagnóstico (form)** — izq: "Descubrí qué está frenando tu proyecto" + lista
   de entregables; der: form (Nombre, Marca, Email, Tel, "Contame tu proyecto").
   Submit "QUIERO MI DIAGNÓSTICO GRATIS" → arma mensaje y **abre WhatsApp**
   `https://wa.me/543815100334?text=...`. "Respondo en menos de 24 hs".
   Fondo: `public/bg/spiral.png` tenue.
8. **Footer** — "Paulina Umanez / inna founder"; redes IN·IG·FB·TW (placeholder
   `#`); tel +54 9 (381) 5100 334 → wa.me; mail inna.areavisual@gmail.com →
   mailto; "HABLEMOS →" → WhatsApp. © 2026 INNA ESTRATEGIA. Selector ES | IN (UI).

## Comportamiento
- Responsive: desktop multi-columna → mobile 1 columna; nav colapsa CTA.
- Scroll suave; reveal fade/translate al entrar en viewport.
- Form valida campos requeridos (Nombre, Email/Tel) antes de abrir WhatsApp.
- Accesibilidad: labels asociados, foco visible, `alt` en imágenes, contraste AA.

## Datos de contacto (del mockup)
- WhatsApp/Tel: +54 9 381 510-0334 → `543815100334`
- Email: inna.areavisual@gmail.com
- Redes: placeholder hasta recibir URLs reales.

## Fuera de alcance (YAGNI)
- Backend/DB, i18n real (el selector ES|IN queda como UI), CMS, blog, analytics
  (se puede sumar después).

## Verificación
Tras construir: levantar dev, capturar screenshots reales (desktop+mobile) con
Playwright y correr review multi-agente (fidelidad vs mockup, responsive, a11y,
calidad de código). Aplicar fixes.
