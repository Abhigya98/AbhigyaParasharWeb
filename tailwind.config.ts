import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13222f",
        paper: "#fbfaf6",
        accent: "#b34f24",
        accentSoft: "#f4d6c8",
        sea: "#2f7c85",
      },
      boxShadow: {
        card: "0 20px 40px -24px rgba(19, 34, 47, 0.45)",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-lora)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
