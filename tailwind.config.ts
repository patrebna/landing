import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00ad64",
          secondary: "#0088cc",
          dark: "#0f172a",
          light: "#ffffff",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
      fontFamily: {
        display: ["Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 20px 50px -30px rgba(15, 23, 42, 0.5)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(0, 173, 100, 0.25), transparent 50%), radial-gradient(circle at 80% 10%, rgba(0, 136, 204, 0.3), transparent 55%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
