/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // These resolve to CSS custom properties defined in index.css,
        // so every utility below automatically respects light/dark —
        // there's no need for separate dark: variants on color classes.
        potbg: "var(--pot-bg)",
        potsurface: "var(--pot-surface)",
        potborder: "var(--pot-border)",
        potink: "var(--pot-ink)",
        potmuted: "var(--pot-muted)",
        potaccent: "var(--pot-accent)",
        potaccenthover: "var(--pot-accent-hover)",
        potoncaccent: "var(--pot-on-accent)",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        "4xl": "28px",
      },
    },
  },
  plugins: [],
};
