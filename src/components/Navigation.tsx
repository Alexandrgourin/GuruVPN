import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WebApp } from '@twa-dev/sdk';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Настраиваем кнопку "Назад"
    if (location.pathname === '/') {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      const handleBack = () => {
        navigate(-1);
      };
      WebApp.BackButton.onClick(handleBack);
      
      return () => {
        WebApp.BackButton.offClick(handleBack);
      };
    }
  }, [location.pathname, navigate]);

  return null; // Этот компонент не рендерит UI, он только управляет навигацией
};

export default Navigation;
