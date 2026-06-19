/**
 * Deterministic CSS starfield. Generated with a seeded PRNG so server and client
 * render identical output (no hydration mismatch) and it stays crisp at any size.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function starShadow(count: number, seed: number, spread = 2000): string {
  const rand = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * spread);
    const y = Math.round(rand() * spread);
    const a = (0.25 + rand() * 0.6).toFixed(2);
    parts.push(`${x}px ${y}px rgba(255,255,255,${a})`);
  }
  return parts.join(", ");
}

type Props = {
  /** approximate number of stars */
  density?: number;
  seed?: number;
  className?: string;
};

export default function Stars({ density = 120, seed = 7, className = "" }: Props) {
  const small = starShadow(density, seed);
  const big = starShadow(Math.round(density / 4), seed + 99);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-0 top-0 h-px w-px rounded-full"
        style={{ boxShadow: small, opacity: 0.7 }}
      />
      <div
        className="absolute left-0 top-0 h-[2px] w-[2px] rounded-full"
        style={{ boxShadow: big, opacity: 0.9 }}
      />
    </div>
  );
}
