import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe'
import Setup from './pages/Setup'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Layout from './components/Layout'
import WebApp from '@twa-dev/sdk'
import { api } from './services/api'
import './App.css'

// Компонент для обработки навигации
const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Настраиваем кнопку "Назад"
    if (location.pathname === '/') {
      WebApp.BackButton.hide();
      return;
    } 
    
    WebApp.BackButton.show();
    const handleBack = () => navigate(-1);
    WebApp.BackButton.onClick(handleBack);
    
    return () => {
      WebApp.BackButton.offClick(handleBack);
    };
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

    // Инициализируем пользователя при первом входе
    const initUser = async () => {
      try {
        const initData = WebApp.initData;
        if (!initData) {
          console.error('No init data available');
          return;
        }

        // Проверяем, есть ли уже инициализированный пользователь в localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          console.log('User already initialized:', storedUserId);
          return;
        }

        const user = await api.initUser({
          telegramId: WebApp.initDataUnsafe.user.id,
          username: WebApp.initDataUnsafe.user.username,
        });
        
        // Сохраняем ID пользователя в localStorage
        localStorage.setItem('userId', user.id);
        console.log('User initialized:', user);
      } catch (error) {
        console.error('Failed to initialize user:', error);
      }
    };

    initUser();
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
