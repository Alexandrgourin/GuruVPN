import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe'
import Setup from './pages/Setup'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Layout from './components/Layout'
import WebApp from '@twa-dev/sdk'
import './App.css'

// Компонент для обработки навигации
const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Настраиваем кнопку "Назад"
    if (location.pathname === '/') {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      const handleBack = () => navigate(-1);
      WebApp.BackButton.onClick(handleBack);
      return () => WebApp.BackButton.offClick(handleBack);
    }
  }, [location.pathname, navigate]);

  return null;
};

function App() {
  useEffect(() => {
    // Сообщаем что приложение готово
    WebApp.ready();
    
    // Настройка основной кнопки
    WebApp.MainButton.hide();
    
    // Настройка темы
    document.documentElement.className = WebApp.colorScheme;

    // Применяем цвета из темы Telegram
    const themeParams = WebApp.themeParams;
    if (themeParams) {
      Object.entries(themeParams).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--tg-${key}`, value);
      });
    }

    // Настройка viewport
    WebApp.expand();

    // Очистка при размонтировании
    return () => {
      const noop = () => {};
      WebApp.BackButton.offClick(noop);
      WebApp.MainButton.offClick(noop);
    };
  }, []);

  return (
    <Router>
      <NavigationHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
