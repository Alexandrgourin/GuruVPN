import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>GuruVPN</h1>
      <div className="button-grid">
        <button onClick={() => navigate('/subscribe')}>Купить подписку</button>
        <button onClick={() => navigate('/setup')}>Настройка VPN</button>
        <button onClick={() => navigate('/profile')}>Профиль</button>
        <button onClick={() => navigate('/support')}>Поддержка</button>
      </div>
    </div>
  );
};

export default Home;
