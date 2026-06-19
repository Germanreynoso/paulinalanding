"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site";

type Fields = {
  nombre: string;
  marca: string;
  email: string;
  tel: string;
  proyecto: string;
};

const empty: Fields = { nombre: "", marca: "", email: "", tel: "", proyecto: "" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DiagnosticForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!f.nombre.trim()) next.nombre = "Decime tu nombre";
    if (!f.email.trim()) next.email = "Falta tu email";
    else if (!emailRe.test(f.email.trim())) next.email = "Email inválido";
    if (!f.tel.trim()) next.tel = "Dejame un teléfono";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const msg =
      `¡Hola Paulina! Quiero mi diagnóstico gratis.\n\n` +
      `• Nombre: ${f.nombre}\n` +
      (f.marca.trim() ? `• Marca: ${f.marca}\n` : "") +
      `• Email: ${f.email}\n` +
      `• Tel: ${f.tel}\n` +
      (f.proyecto.trim() ? `• Proyecto: ${f.proyecto}\n` : "");

    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card !p-6 md:!p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="nombre" label="Nombre" error={errors.nombre}>
          <input
            id="nombre"
            placeholder="Nombre"
            value={f.nombre}
            onChange={set("nombre")}
            autoComplete="name"
          />
        </Field>
        <Field id="marca" label="Marca">
          <input
            id="marca"
            placeholder="Marca"
            value={f.marca}
            onChange={set("marca")}
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            inputMode="email"
            placeholder="Email"
            value={f.email}
            onChange={set("email")}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="tel" label="Teléfono" error={errors.tel}>
          <input
            id="tel"
            type="tel"
            inputMode="tel"
            placeholder="Teléfono"
            value={f.tel}
            onChange={set("tel")}
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="proyecto" label="Contame tu proyecto (opcional)">
          <textarea
            id="proyecto"
            rows={3}
            placeholder="Contame tu proyecto (opcional)"
            value={f.proyecto}
            onChange={set("proyecto")}
            className="resize-none"
          />
        </Field>
      </div>

      <button type="submit" className="pill pill-dark mt-7 w-full">
        Quiero mi diagnóstico gratis
      </button>

      {sent ? (
        <p
          role="status"
          className="mt-4 text-center text-[13px] font-medium text-emerald-300"
        >
          ✓ ¡Listo! Te llevo a WhatsApp…
        </p>
      ) : (
        <p className="mt-4 text-center text-[13px] text-faint">
          Respondo <span className="text-white/80">en menos de 24 hs</span>
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] text-red-400/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}
