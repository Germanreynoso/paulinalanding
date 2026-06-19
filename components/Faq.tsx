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
