import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:   ["Inter", "sans-serif"],
        sora:    ["Sora", "sans-serif"],
      },
      colors: {
        brand: {
          red:   "#DC2626",
          blue:  "#1E3A8A",
          blueMd:"#2563EB",
          navy:  "#0F172A",
        },
        surface: {
          white: "#FFFFFF",
          gray:  "#F8FAFC",
          light: "#F1F5F9",
          border:"#E2E8F0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-gradient":  "linear-gradient(135deg, #DC2626 0%, #1E3A8A 100%)",
      },
      boxShadow: {
        "red-glow":    "0 0 28px rgba(220,38,38,0.3)",
        "red-glow-lg": "0 0 56px rgba(220,38,38,0.4)",
        "blue-glow":   "0 0 28px rgba(30,58,138,0.3)",
        "card":        "0 4px 24px rgba(15,23,42,0.08)",
        "card-lg":     "0 12px 48px rgba(15,23,42,0.12)",
        "card-hover":  "0 20px 56px rgba(15,23,42,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
