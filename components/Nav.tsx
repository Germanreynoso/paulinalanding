"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-ink-900/70 backdrop-blur-md" : ""
      }`}
    >
      <nav
        className={`shell flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <a href="#top" aria-label="INNA — inicio" className="flex items-center">
          <Image
            src="/logo.png"
            alt="INNA"
            width={84}
            height={30}
            priority
            className="h-[26px] w-auto opacity-95"
          />
        </a>
        <a href="#diagnostico" className="pill pill-outline !px-5 !py-2.5 text-[11px]">
          Quiero mi diagnóstico gratis
        </a>
      </nav>
    </header>
  );
}
