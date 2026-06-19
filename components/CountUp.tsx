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
      {/* Animado: oculto para AT (evita anunciar valores intermedios). */}
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      {/* Valor final estable para lectores de pantalla. */}
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
