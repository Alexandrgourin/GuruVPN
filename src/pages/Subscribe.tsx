import React from 'react';
import WebApp from '@twa-dev/sdk';

const Subscribe: React.FC = () => {
  const handleSubscribe = async () => {
    try {
      // Here will be implementation of Telegram Payments
      await WebApp.showAlert('Функция оплаты будет добавлена позже');
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="subscribe-container">
      <h2>Выберите план подписки</h2>
      <div className="subscription-plans">
        {/* Здесь будут планы подписки */}
        <button onClick={handleSubscribe}>
          Купить подписку
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
