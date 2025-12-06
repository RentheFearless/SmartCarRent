// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Вказуємо Tailwind сканувати всі JSX/JS/TS файли у src/
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}