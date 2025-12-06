// client/postcss.config.js

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // 2. Потім PostCSS автоматично додає префікси для кращої сумісності браузерів
    'autoprefixer': {},
  } // 🟢 Закриваємо об'єкт plugins
}; // 🟢 Закриваємо об'єкт export default