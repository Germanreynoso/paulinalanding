import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inna-estrategia.vercel.app"),
  title: "INNA Estrategia — ¿Tu marca no está funcionando como debería?",
  description:
    "Diagnóstico gratis de marca por Paulina Umanez. En una consulta te digo qué está fallando y qué hacer para mejorar tu contenido, tu imagen y tus resultados.",
  keywords: [
    "estrategia de marca",
    "diagnóstico de marca",
    "dirección creativa",
    "contenido",
    "INNA",
  ],
  openGraph: {
    title: "INNA Estrategia — Diagnóstico de marca gratis",
    description:
      "En una consulta te digo qué está fallando y qué hacer para mejorar tu contenido, tu imagen y tus resultados.",
    type: "website",
    locale: "es_AR",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
