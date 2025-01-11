import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Subscribe from './pages/Subscribe'
import Setup from './pages/Setup'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Layout from './components/Layout'
import { WebApp } from '@telegram-apps/sdk'
import './App.css'

function App() {
  useEffect(() => {
    // Инициализация Telegram Mini App
    WebApp.ready();
    
    // Настройка основной кнопки
    WebApp.MainButton.hide();
    
    // Настройка темы
    document.documentElement.className = WebApp.colorScheme;

    // Настройка viewport
    WebApp.expand();
  }, []);

  return (
    <Router>
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
