/**
 * Unofficial Tailwind preset based on the public Mistral Docs token structure.
 * It intentionally does not include a logo, wordmark, font file or model artwork.
 */
export default {
  theme: {
    extend: {
      colors: {
        mistralReference: {
          red: "#E10500",
          orange: "#FA500F",
          brightOrange: "#FF8205",
          yellow: "#FFAF00",
          brightYellow: "#FFD700",
          100: "#FFD700",
          200: "#FFC300",
          300: "#FFAF00",
          400: "#FF9900",
          500: "#FF8205",
          600: "#FF6600",
          700: "#FA500F",
          800: "#F13C00",
          900: "#E92700",
        },
        product: {
          vibe: "#FA500F",
          studio: "#0082E6",
          admin: "#4A4A5E",
          models: "#6F6F84",
        },
        background: "var(--msr-background)",
        foreground: "var(--msr-foreground)",
        card: "var(--msr-card)",
        primary: "var(--msr-primary)",
        "primary-foreground": "var(--msr-primary-foreground)",
        "primary-soft": "var(--msr-primary-soft)",
        secondary: "var(--msr-secondary)",
        muted: "var(--msr-muted)",
        "muted-foreground": "var(--msr-muted-foreground)",
        border: "var(--msr-border)",
      },
      fontFamily: {
        sans: ["Arial", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SF Mono", "ui-monospace", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "var(--msr-radius-sm)",
        md: "var(--msr-radius-md)",
        lg: "var(--msr-radius-lg)",
        xl: "var(--msr-radius-xl)",
      },
      spacing: {
        header: "var(--msr-header-height)",
        sidebar: "var(--msr-sidebar-width)",
        sides: "var(--msr-space-sides)",
        inner: "var(--msr-space-inner)",
      },
      maxWidth: {
        canvas: "var(--msr-max-canvas)",
      },
      transitionTimingFunction: {
        expressive: "var(--msr-ease-expressive)",
      },
    },
  },
};
