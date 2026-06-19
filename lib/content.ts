import { whatsappUrl } from "@/lib/site";

export type Project = {
  id: string;
  name: string;
  year: string;
  tagline: string;
  image: string;
  description: string;
  services: string[];
  result: string;
};

export type Expertise = { id: string; title: string; detail: string };

export type Faq = { id: string; q: string; a: string };

// Contenido placeholder — editable. Reemplazar por datos reales de cada proyecto.
export const projects: Project[] = [
  {
    id: "cgi",
    name: "CGI Group",
    year: "2024",
    tagline: "Identidad visual y dirección creativa",
    image: "/gallery/cgi.png",
    description:
      "Ordenamos la presencia digital de la marca y definimos una dirección visual coherente para todos sus canales, con piezas listas para producir.",
    services: ["Branding", "Dirección creativa", "CGI / 3D"],
    result: "Comunicación más clara y consistente en cada punto de contacto.",
  },
  {
    id: "castelli",
    name: "Castelli Group",
    year: "2024",
    tagline: "Estrategia de marca y contenido editorial",
    image: "/gallery/castelli.png",
    description:
      "Definimos el tono y la línea editorial, y produjimos contenido que transmite autoridad y cercanía a la vez.",
    services: ["Estrategia", "Copy", "Fotografía"],
    result: "Una marca que se percibe profesional y confiable.",
  },
  {
    id: "testify",
    name: "The Training Center",
    year: "2023",
    tagline: "Campaña audiovisual — Testify",
    image: "/gallery/testify.png",
    description:
      "Dirigimos y produjimos la campaña audiovisual del centro, con un relato que conecta esfuerzo y resultado.",
    services: ["Dirección audiovisual", "Producción", "Edición"],
    result: "Más alcance y consultas en los lanzamientos.",
  },
  {
    id: "brutal",
    name: "Brutal",
    year: "2023",
    tagline: "Campaña deportiva y arte de marca",
    image: "/gallery/brutal.png",
    description:
      "Construimos el universo visual de la campaña, combinando fotografía, color y dirección de arte con identidad propia.",
    services: ["Dirección de arte", "Pauta", "Contenido"],
    result: "Una campaña con identidad fuerte y memorable.",
  },
  {
    id: "audiovisual",
    name: "The AudioVisual Dream Studio",
    year: "2023",
    tagline: "Marca y posicionamiento de estudio",
    image: "/gallery/audiovisual.png",
    description:
      "Definimos la identidad del estudio y su narrativa, con piezas que muestran su forma de trabajar.",
    services: ["Branding", "Dirección creativa", "Contenido"],
    result: "Posicionamiento claro frente a su competencia.",
  },
];

// Contenido real (provisto por el cliente — "QUÉ DESARROLLO", curado en 6 áreas).
export const expertise: Expertise[] = [
  {
    id: "branding",
    title: "Branding & Posicionamiento",
    detail:
      "Construcción de marcas con posicionamiento claro y alto valor percibido, con dirección creativa y conceptual para experiencias digitales.",
  },
  {
    id: "uxui",
    title: "UX/UI & Experiencia",
    detail:
      "UX/UI orientado a claridad, percepción y conversión. Estructuro experiencias más intuitivas y coherentes, optimizando recorridos y lógica de interacción.",
  },
  {
    id: "estrategia",
    title: "Estrategia & Comunicación",
    detail:
      "Estrategias de comunicación para productos, software y marcas, con sistemas de contenido y comunicación escalables.",
  },
  {
    id: "sistemas",
    title: "Sistemas visuales & digitales",
    detail:
      "Sistemas visuales y digitales diseñados para reducir la carga cognitiva: menos ruido, más claridad.",
  },
  {
    id: "narrativa",
    title: "Narrativa visual & Storytelling",
    detail:
      "Storytelling y narrativa visual aplicada a branding y tecnología, para que la marca se entienda y se recuerde.",
  },
  {
    id: "producto",
    title: "Producto & Automatización",
    detail:
      "Decisiones de estructura de producto, automatización y sistemas de interacción para que todo funcione de forma más inteligente.",
  },
];

export const faqs: Faq[] = [
  {
    id: "que-es",
    q: "¿Qué incluye el diagnóstico gratis?",
    a: "Una consulta de 45' donde reviso tu marca y te digo qué está fallando, qué mejorar primero y una dirección clara para avanzar. Sin costo ni compromiso.",
  },
  {
    id: "tiempo",
    q: "¿En cuánto tiempo respondés?",
    a: "Respondo en menos de 24 hs hábiles desde que dejás tus datos.",
  },
  {
    id: "trabajo",
    q: "¿Cómo es trabajar con INNA?",
    a: "Un solo interlocutor para todo: estrategia, diseño, audiovisual y dirección creativa. Sin pasar por mil personas.",
  },
  {
    id: "online",
    q: "¿Trabajás online o presencial?",
    a: "Trabajo online con marcas de cualquier ciudad. Por contratación online tenés además un beneficio de bienvenida.",
  },
  {
    id: "rubros",
    q: "¿Con qué rubros trabajás?",
    a: "Con marcas de distintos rubros que necesitan orden, claridad y contenido que conecte. Si tenés dudas, escribime y lo vemos.",
  },
];

export type Pillar = { title: string; detail: string };

// Sección "Enfoque estratégico" (contenido real del cliente).
export const approachTags: string[] = [
  "Estrategia",
  "Tecnología",
  "Branding",
  "UX/UI",
  "Comportamiento humano",
  "Automatización",
  "Narrativa visual",
  "Sistemas digitales",
];

export const whyMe: Pillar[] = [
  {
    title: "Pensamiento estratégico",
    detail:
      "Detecto fricción, saturación visual y falta de claridad para construir marcas que se perciban más inteligentes y valiosas.",
  },
  {
    title: "Sensibilidad visual",
    detail:
      "El diseño no como estética, sino como herramienta para organizar percepción e influir en el comportamiento.",
  },
  {
    title: "Lógica de sistemas",
    detail:
      "Estructuras digitales y marcas que reducen fricción, generan diferenciación real y construyen percepción sólida a largo plazo.",
  },
];

/** wa.me link con un mensaje pre-cargado referido a un proyecto puntual. */
export function projectWhatsappUrl(p: Project): string {
  return whatsappUrl(
    `¡Hola Paulina! Vi el proyecto "${p.name}" y quiero algo así para mi marca.`
  );
}
