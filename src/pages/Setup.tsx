import React, { useEffect, useState } from 'react';
import { WebApp } from '@telegram-apps/sdk';

type Platform = 'ios' | 'android' | 'androidtv' | 'windows' | 'macos' | 'macos-intel';

const Setup: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('ios');
  const [step, setStep] = useState(1);

  const platformLinks = {
    ios: 'https://apps.apple.com/ru/app/v2raytun/id6476628951',
    'ios-old': 'https://apps.apple.com/ru/app/streisand/id6450534064',
    android: 'https://play.google.com/store/apps/details?id=com.v2raytun.android',
    androidtv: 'https://play.google.com/store/apps/details?id=com.v2raytun.android',
    windows: 'https://apps.microsoft.com/detail/9pdfnl3qv2s5?hl=ru-ru&gl=RU',
    macos: 'https://apps.apple.com/ru/app/v2raytun/id6476628951',
    'macos-intel': 'https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-MacOS.dmg'
  };

  const detectPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios';
    if (userAgent.includes('android')) return 'android';
    if (userAgent.includes('windows')) return 'windows';
    if (userAgent.includes('macintosh')) {
      // Здесь нужна дополнительная логика для определения Intel/ARM
      return 'macos';
    }
    return 'ios'; // default
  };

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleInstallApp = () => {
    const link = platformLinks[platform];
    if (link) {
      WebApp.openLink(link);
    }
  };

  return (
    <div className="setup-container">
      <h2>Настройка VPN</h2>
      
      <div className="platform-selector">
        <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
          <option value="ios">iOS</option>
          <option value="android">Android</option>
          <option value="androidtv">Android TV</option>
          <option value="windows">Windows</option>
          <option value="macos">macOS</option>
          <option value="macos-intel">macOS (Intel)</option>
        </select>
      </div>

      <div className="setup-steps">
        {step === 1 && (
          <div className="step">
            <h3>Шаг 1: Установка приложения</h3>
            <button onClick={handleInstallApp}>
              Установить приложение
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="step">
            <h3>Шаг 2: Настройка подключения</h3>
            {/* Здесь будет QR код и конфигурация */}
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Назад</button>
        )}
        {step < 2 && (
          <button onClick={() => setStep(step + 1)}>Далее</button>
        )}
      </div>
    </div>
  );
};

export default Setup;
