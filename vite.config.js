// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // або '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Встановлюємо порт 3000 для локального запуску
    port: 3000, 
    // host: true потрібен для коректної роботи в Docker
    host: true 
  }
});