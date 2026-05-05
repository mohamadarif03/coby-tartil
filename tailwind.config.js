import tailwindForms from '@tailwindcss/forms';
import tailwindContainerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "inverse-on-surface": "#1f3430",
        "secondary-fixed-dim": "#ffba38",
        "surface-bright": "#283d38",
        "surface-container-low": "#091f1b",
        "on-secondary": "#432c00",
        "error-container": "#93000a",
        "outline-variant": "#3e4946",
        "surface": "#021713",
        "on-background": "#cfe8e1",
        "on-tertiary-fixed-variant": "#00504b",
        "tertiary-fixed-dim": "#89d4cd",
        "on-primary-fixed": "#00201a",
        "surface-container-high": "#182e29",
        "on-primary-fixed-variant": "#005145",
        "primary-fixed": "#68fadd",
        "on-error-container": "#ffdad6",
        "surface-container": "#0d231f",
        "outline": "#889390",
        "on-primary-container": "#59edd1",
        "secondary-fixed": "#ffdeac",
        "on-secondary-fixed-variant": "#604100",
        "inverse-primary": "#006b5c",
        "on-surface-variant": "#bec9c5",
        "surface-dim": "#021713",
        "on-tertiary": "#003734",
        "primary": "#44ddc1",
        "surface-container-highest": "#233934",
        "surface-variant": "#233934",
        "on-surface": "#cfe8e1",
        "on-secondary-container": "#6a4800",
        "tertiary": "#89d4cd",
        "secondary-container": "#feb300",
        "inverse-surface": "#cfe8e1",
        "on-tertiary-container": "#98e4dd",
        "on-tertiary-fixed": "#00201e",
        "on-error": "#690005",
        "surface-tint": "#44ddc1",
        "primary-container": "#00695a",
        "tertiary-container": "#106863",
        "tertiary-fixed": "#a4f0e9",
        "primary-fixed-dim": "#44ddc1",
        "on-primary": "#00382f",
        "on-secondary-fixed": "#281900",
        "surface-container-lowest": "#00110e",
        "error": "#ffb4ab",
        "secondary": "#ffd799",
        "background": "#021713"
      },
      "borderRadius": {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Playfair Display", 'serif'],
        "body": ["Lexend", 'sans-serif'],
        "label": ["Lexend", 'sans-serif']
      }
    },
  },
  plugins: [
    tailwindForms,
    tailwindContainerQueries
  ],
}
