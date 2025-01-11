import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = () => {
      if (location.pathname !== '/') {
        navigate(-1);
      } else {
        WebApp.close();
      }
    };

    WebApp.BackButton.onClick(handleBackButton);

    // Show/hide back button based on current route
    if (location.pathname === '/') {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
    }

    return () => {
      WebApp.BackButton.offClick(handleBackButton);
    };
  }, [location.pathname, navigate]);

  return null; // Этот компонент не рендерит UI, он только управляет навигацией
};

export default Navigation;
