import { site, whatsappUrl, mailtoUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <div className="shell grid gap-10 py-16 md:grid-cols-3 md:items-start">
        {/* Identity */}
        <div>
          <p className="font-display text-lg font-semibold text-white">
            {site.founder}
          </p>
          <p className="mt-1 text-[13px] text-faint">{site.role}</p>
        </div>

        {/* Socials */}
        <div className="md:text-center">
          <p className="eyebrow">Socials</p>
          <div className="mt-4 flex gap-3 md:justify-center">
            {site.socials.map((s) => {
              const cls =
                "flex h-10 w-10 items-center justify-center rounded-full border border-line text-[11px] font-medium text-muted";
              // Placeholder until real profile URLs exist: render non-interactive
              // so keyboard/screen-reader users aren't sent to a dead link.
              return s.href === "#" ? (
                <span
                  key={s.label}
                  aria-label={`${s.name} — próximamente`}
                  aria-disabled="true"
                  className={`${cls} cursor-default opacity-70`}
                >
                  {s.label}
                </span>
              ) : (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} transition-colors hover:border-white/40 hover:text-white`}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="md:text-right">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[15px] text-white transition-colors hover:text-white/70"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={mailtoUrl}
            className="mt-1 block text-[14px] text-muted transition-colors hover:text-white"
          >
            {site.email}
          </a>
          <a
            href={whatsappUrl("¡Hola Paulina! Quiero hablar sobre mi marca.")}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-5 inline-block hover:text-white transition-colors"
          >
            Hablemos →
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-faint
          sm:flex-row">
          <p className="text-[12px] uppercase tracking-[0.16em]">
            © 2026 INNA Estrategia · todos los derechos reservados
          </p>
          <div className="flex items-center gap-4 text-[12px]">
            <span className="text-white/80">ES</span>
            <span className="text-faint">IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
