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
          blue:  "#1D4ED8",
          light: "#EF4444",
          sky:   "#3B82F6",
        },
        navy: {
          800: "#0F172A",
          900: "#020617",
          950: "#010314",
        },
      },
      animation: {
        "float":       "float 6s ease-in-out infinite",
        "float-slow":  "float 8s ease-in-out infinite",
        "spin-slow":   "spin 20s linear infinite",
        "gradient-x":  "gradientX 4s ease infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":   "linear-gradient(135deg, #020617 0%, #0F172A 50%, #0a0010 100%)",
        "brand-gradient":  "linear-gradient(135deg, #DC2626 0%, #1D4ED8 100%)",
        "card-gradient":   "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        "red-glow":    "0 0 30px rgba(220, 38, 38, 0.35)",
        "red-glow-lg": "0 0 60px rgba(220, 38, 38, 0.45)",
        "blue-glow":   "0 0 30px rgba(29, 78, 216, 0.35)",
        "card-glow":   "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass":       "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
