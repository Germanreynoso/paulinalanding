"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  // Enter/leave — doble rAF para garantizar que el estado inicial
  // (data-visible=false) se pinte antes de activar la transición de entrada.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      setRender(true);
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    setVisible(false);
    const t = setTimeout(() => setRender(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  // Scroll lock + fondo inerte + foco inicial + foco de retorno
  useEffect(() => {
    if (!render) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop(); // pausa el smooth-scroll del fondo mientras el modal está abierto

    // El resto del DOM queda inerte para teclado y lectores de pantalla
    // (aria-modal no es honrado de forma fiable por todos los AT).
    const overlay = overlayRef.current;
    const backgrounded = Array.from(document.body.children).filter(
      (el) => el !== overlay
    );
    const prevState = backgrounded.map((el) => ({
      el,
      hadInert: el.hasAttribute("inert"),
      ariaHidden: el.getAttribute("aria-hidden"),
    }));
    backgrounded.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    const focusTimer = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      clearTimeout(focusTimer);
      prevState.forEach(({ el, hadInert, ariaHidden }) => {
        if (!hadInert) el.removeAttribute("inert");
        if (ariaHidden === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", ariaHidden);
      });
      lastFocused.current?.focus?.();
    };
  }, [render, lenis]);

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
      ref={overlayRef}
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
        data-lenis-prevent
        className={`modal-panel ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
