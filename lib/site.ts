export const site = {
  brand: "INNA",
  founder: "Paulina Umanez",
  role: "inna founder",
  // Phone in international format, digits only, for wa.me links.
  whatsapp: "543815100334",
  phoneDisplay: "+54 9 (381) 5100 334",
  email: "inna.areavisual@gmail.com",
  // Replace with real profile URLs when available.
  socials: [
    { label: "IN", name: "LinkedIn", href: "#" },
    { label: "IG", name: "Instagram", href: "#" },
    { label: "FB", name: "Facebook", href: "#" },
    { label: "TW", name: "X / Twitter", href: "#" },
  ],
} as const;

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailtoUrl = `mailto:${site.email}`;
