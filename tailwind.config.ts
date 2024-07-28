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
        inter: ["var(--font-inter)"],
        ubuntu: ["var(--font-ubuntu)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
      },
      colors: {
        primary: "#86EE60",
        secondary: "#2E6E65",
        tertiary: "#F4F7ED",
        shadow: "#2B3752",
      },
    },
  },
  plugins: [],
};
export default config;
