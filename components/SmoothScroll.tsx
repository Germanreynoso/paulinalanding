"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import "lenis/dist/lenis.css";

/**
 * Smooth scroll con momentum (Lenis) a nivel root.
 * - `anchors: true` hace que los links #ancla scrolleen suave solos.
 * - Se desactiva si el usuario pidió prefers-reduced-motion (cae a scroll nativo).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // anchors:true respeta scroll-padding-top (90px) del header fijo.
        anchors: true,
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
