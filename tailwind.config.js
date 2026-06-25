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
        "inverse-on-surface": "#341f1f",
        "secondary-fixed-dim": "#ffd700",
        "surface-bright": "#3d2828",
        "surface-container-low": "#1f0909",
        "on-secondary": "#432c00",
        "error-container": "#93000a",
        "outline-variant": "#493e3e",
        "surface": "#170202",
        "on-background": "#e8cfcf",
        "on-tertiary-fixed-variant": "#503e00",
        "tertiary-fixed-dim": "#d4c589",
        "on-primary-fixed": "#200000",
        "surface-container-high": "#2e1818",
        "on-primary-fixed-variant": "#510000",
        "primary-fixed": "#fa6868",
        "on-error-container": "#ffdad6",
        "surface-container": "#230d0d",
        "outline": "#938888",
        "on-primary-container": "#ed5959",
        "secondary-fixed": "#ffebac",
        "on-secondary-fixed-variant": "#604100",
        "inverse-primary": "#6b0000",
        "on-surface-variant": "#c9bebe",
        "surface-dim": "#170202",
        "on-tertiary": "#372c00",
        "primary": "#dd4444",
        "surface-container-highest": "#392323",
        "surface-variant": "#392323",
        "on-surface": "#e8cfcf",
        "on-secondary-container": "#6a4800",
        "tertiary": "#d4c589",
        "secondary-container": "#ffd700",
        "inverse-surface": "#e8cfcf",
        "on-tertiary-container": "#e4dd98",
        "on-tertiary-fixed": "#201e00",
        "on-error": "#690005",
        "surface-tint": "#dd4444",
        "primary-container": "#690000",
        "tertiary-container": "#685b10",
        "tertiary-fixed": "#f0e9a4",
        "primary-fixed-dim": "#dd4444",
        "on-primary": "#380000",
        "on-secondary-fixed": "#281900",
        "surface-container-lowest": "#110000",
        "error": "#ffb4ab",
        "secondary": "#ffdf80",
        "background": "#170202"
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
