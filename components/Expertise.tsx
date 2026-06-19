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
