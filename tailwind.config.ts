import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "#000000",
          900: "#070708",
          800: "#0d0d0f",
          700: "#141417",
          600: "#1a1a1e",
          500: "#26262b",
        },
        line: "rgba(255,255,255,0.08)",
        muted: "#9a9aa1",
        faint: "#82828b",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 80s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
