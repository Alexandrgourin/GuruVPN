import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { DeviceCounter } from '../components/DeviceCounter';
import { subscriptionPlans, deviceLimits } from '../config/subscriptionPlans';
import { api } from '../services/api';
import type { SubscriptionPlan } from '../types/subscription';
import './Subscribe.css';

const Subscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [deviceCount, setDeviceCount] = useState(deviceLimits.default);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const handleMainButtonClick = async () => {
      if (!selectedPlan || !userId) return;
      
      setIsLoading(true);
      try {
        const totalAmount = selectedPlan.price * deviceCount;

        // Создаем платеж через API
        const payment = await api.createPayment({
          planId: selectedPlan.id,
          deviceCount,
          amount: totalAmount,
          userId,
        });

        console.log('Payment created:', payment);

        // Открываем URL для оплаты
        if (payment.confirmation_url) {
          WebApp.openLink(payment.confirmation_url);
        }

        // Отправляем данные в бота
        WebApp.sendData(JSON.stringify({
          action: 'payment_created',
          payment_id: payment.id,
          confirmation_url: payment.confirmation_url,
          plan_id: selectedPlan.id,
          device_count: deviceCount,
          amount: totalAmount,
        }));

      } catch (error) {
        console.error('Payment error:', error);
        WebApp.showAlert('Произошла ошибка при создании платежа');
      } finally {
        setIsLoading(false);
      }
    };

    if (!selectedPlan || !userId) {
      WebApp.MainButton.hide();
      return;
    }

    const totalAmount = selectedPlan.price * deviceCount;

    WebApp.MainButton.show();
    WebApp.MainButton.setParams({
      text: `Оплатить ${totalAmount} ₽`,
      is_active: true,
      color: '#2ea664'
    });

    WebApp.MainButton.onClick(handleMainButtonClick);

    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
    };
  }, [selectedPlan, deviceCount, userId]);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    if (selectedPlan === plan) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(plan);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="subscription-page">
      <h1>Выберите план подписки</h1>
      <div className="subscription-plans">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan ? 'selected' : ''} ${plan.isPopular ? 'popular' : ''}`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.isPopular && <div className="popular-badge">Популярный</div>}
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <div className="price">
              <span className="amount">{plan.price} ₽</span>
              <span className="period">/{plan.duration === 1 ? 'месяц' : 
                plan.duration === 12 ? 'год' : 
                `${plan.duration} мес.`}</span>
            </div>
            <div className="price-per-month">
              {plan.duration > 1 && 
                `${Math.round(plan.price / plan.duration)} ₽/мес`}
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <DeviceCounter
          value={deviceCount}
          onChange={setDeviceCount}
        />
      )}
    </div>
  );
};

export default Subscribe;
