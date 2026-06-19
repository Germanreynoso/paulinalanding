import { approachTags } from "@/lib/content";

/**
 * Marquee infinito con las disciplinas. La primera pista es legible para AT;
 * la segunda (clon visual para el loop) va aria-hidden.
 */
export default function Marquee() {
  return (
    <div className="marquee">
      <ul className="marquee__track">
        {approachTags.map((t) => (
          <li key={t} className="marquee__item">
            {t}
          </li>
        ))}
      </ul>
      <ul className="marquee__track" aria-hidden="true">
        {approachTags.map((t) => (
          <li key={t} className="marquee__item">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
