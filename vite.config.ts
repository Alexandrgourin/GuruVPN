import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Позволяет доступ по IP
      port: 5173,
      strictPort: true, // Гарантирует использование порта 5173
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    }
  };
});
