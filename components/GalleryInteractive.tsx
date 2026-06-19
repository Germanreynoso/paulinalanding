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
