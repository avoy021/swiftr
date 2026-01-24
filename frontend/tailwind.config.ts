import { sub } from "framer-motion/client";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F3C2",
        dark: "#242222",
        primary: "#FF6D1F",
        secondary: "#FFE08F",
        tertiary: "#BF1A1A",
        light: "#FFF8DE",
        test: "#FF714B"
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
        '12xl': '12rem',
        '13xl': '13rem',
        '14xl': '14rem'
      },
      fontFamily: {
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        robotoCondensed: ['var(--font-roboto-condensed)', 'sans-serif'],
        lobster2: ['var(--font-lobster-two)', 'sans-serif']
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgb(255, 255, 255), rgba(255, 255, 255, 0) 95%)',
      },
      borderRadius: {
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
