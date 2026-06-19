import Image from "next/image";

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="shell flex items-center justify-between py-6">
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
