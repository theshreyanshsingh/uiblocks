import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        l: "0px",
        pn: "130px",
        vs: "200px",
        ss: "360px",
        pp: "500px",
        sm: "821px",
        md: "1180px",
        lg: "1440px",
        xl: "1536px",
        txl: "1600px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      animation: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
      keyframes: {
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
      backgroundImage: {
        dots: "url('/assets/dots.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
