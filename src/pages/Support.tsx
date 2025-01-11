import React from 'react';
import WebApp from '@twa-dev/sdk';

const Support: React.FC = () => {
  const handleContactSupport = () => {
    // Здесь будет реализация связи с поддержкой через бота
    WebApp.openTelegramLink('https://t.me/guru_vpn_bot');
  };

  return (
    <div className="support-container">
      <h2>Поддержка</h2>
      
      <div className="faq-section">
        <h3>Часто задаваемые вопросы</h3>
        {/* Здесь будет FAQ */}
      </div>

      <div className="contact-support">
        <h3>Связаться с поддержкой</h3>
        <button onClick={handleContactSupport}>
          Написать в поддержку
        </button>
      </div>
    </div>
  );
};

export default Support;
