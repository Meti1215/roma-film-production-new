import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--accent)",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--card)",
          foreground: "var(--foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--foreground)",
        },
        surface: "var(--card)",
        cream: "var(--secondary)",
        charcoal: "var(--foreground)",
        tan: "var(--accent)",
        "tan-hover": "var(--accent)",
        divider: "var(--border)",
        brand: {
          navy: "#0F2A4A",
          red: "#E63946",
          white: "#FFFFFF",
          charcoal: "#2B2B2B",
          gray: "#F3F4F6",
          border: "#E5E7EB",
        },
      },
      borderRadius: {
        'sm': 'calc(var(--radius) - 2px)',
        'DEFAULT': 'var(--radius)',
        'md': 'var(--radius)',
        'lg': 'calc(var(--radius) + 2px)',
        'xl': 'calc(var(--radius) + 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(184, 146, 90, 0.06), 0 1px 3px 0 rgba(34, 34, 34, 0.03)',
        'DEFAULT': '0 2px 8px -1px rgba(184, 146, 90, 0.08), 0 1px 3px -1px rgba(34, 30, 26, 0.02)',
        'md': '0 4px 16px -2px rgba(184, 146, 90, 0.10), 0 2px 8px -1px rgba(34, 30, 26, 0.03)',
        'lg': '0 12px 24px -4px rgba(184, 146, 90, 0.12), 0 4px 12px -2px rgba(34, 30, 26, 0.04)',
        'xl': '0 20px 32px -6px rgba(184, 146, 90, 0.14), 0 8px 20px -4px rgba(34, 30, 26, 0.04)',
        '2xl': '0 24px 48px -12px rgba(184, 146, 90, 0.16)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.01)',
        'cinematic': '0 8px 32px -4px rgba(184, 146, 90, 0.15), 0 4px 16px -2px rgba(255, 255, 255, 0.05)',
        'tan-glow': '0 0 20px rgba(184, 146, 90, 0.3), 0 0 40px rgba(184, 146, 90, 0.15)',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(184, 146, 90, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(184, 146, 90, 0.45)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-cormorant)', 'Butler', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
};

export default config;
