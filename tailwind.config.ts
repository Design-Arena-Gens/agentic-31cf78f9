import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#0B1220",
        foreground: "#F7F7F5",
        primary: "#15B2A0",
        "primary-foreground": "#F7F7F5",
        secondary: "#1F2937",
        "secondary-foreground": "#F7F7F5",
        muted: "#94A3B8",
        "muted-foreground": "#94A3B8",
        accent: "#15B2A0",
        "accent-foreground": "#F7F7F5",
        destructive: "#E34B4B",
        "destructive-foreground": "#F7F7F5",
        border: "#1F2937",
        input: "#1F2937",
        ring: "#15B2A0",
        card: "#1F2937",
        "card-foreground": "#F7F7F5",
        popover: "#1F2937",
        "popover-foreground": "#F7F7F5",
        gold: "#D4A76A",
        success: "#20C997",
        warning: "#FFB020",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

