import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#29BB00",
          light: "#a2ff88",
          dark: "#1e8800",
        },
        secondary: "#282E38",
        background: {
          DEFAULT: "#F0F1F3",
          light: "#E7F7E5",
          dark: "#37404C",
        },
        textColor: {
          DEFAULT: "#64748B",
          light: "#6B7280",
          dark: "#37404C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
