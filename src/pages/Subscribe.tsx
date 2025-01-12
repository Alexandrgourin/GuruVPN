import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import LoadingSpinner from '../components/LoadingSpinner';

interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    title: '1 месяц',
    description: 'Базовый план',
    price: 299,
    duration: 30,
  },
  {
    id: 'yearly',
    title: '12 месяцев',
    description: 'Выгодное предложение',
    price: 2990,
    duration: 365,
  },
];

const Subscribe: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  // Эффект для управления главной кнопкой
  useEffect(() => {
    // Очищаем предыдущие обработчики
    WebApp.MainButton.offClick();

    if (selectedPlan) {
      WebApp.MainButton.setText('Оплатить');
      WebApp.MainButton.show();
      WebApp.MainButton.onClick(handlePayment);
    } else {
      WebApp.MainButton.hide();
    }

    // Очистка при размонтировании
    return () => {
      WebApp.MainButton.offClick();
      WebApp.MainButton.hide();
    };
  }, [selectedPlan]);

  const handlePayment = async () => {
    if (!selectedPlan) return;

    try {
      setIsLoading(true);
      WebApp.MainButton.showProgress();

      // Отправляем событие в бота для создания счета
      WebApp.sendData(JSON.stringify({
        action: 'subscribe',
        plan: selectedPlan.id,
      }));

      // Показываем сообщение пользователю
      const result = await WebApp.showPopup({
        title: 'Подписка',
        message: `Вы выбрали план "${selectedPlan.title}". Стоимость ${selectedPlan.price} руб.`,
        buttons: [
          { type: 'ok', id: 'confirm' },
          { type: 'cancel' }
        ]
      });

      if (result === 'confirm') {
        WebApp.showAlert('Перенаправление на оплату...');
      } else {
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error('Payment error:', error);
      WebApp.showAlert('Произошла ошибка при оформлении подписки');
    } finally {
      setIsLoading(false);
      WebApp.MainButton.hideProgress();
    }
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (isLoading) return;
    setSelectedPlan(plan);
  };

  return (
    <div className="subscribe-container">
      <h2>Выберите план подписки</h2>
      <div className="subscription-plans">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
          >
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
            <p className="price">{plan.price} ₽</p>
            <button 
              onClick={() => handleSelectPlan(plan)}
              disabled={isLoading}
              className={selectedPlan?.id === plan.id ? 'selected' : ''}
            >
              {isLoading ? <LoadingSpinner size="small" /> : 'Выбрать план'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
