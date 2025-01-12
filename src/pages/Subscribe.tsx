import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import DeviceCounter from '../components/DeviceCounter';
import { subscriptionPlans, deviceLimits } from '../config/subscriptionPlans';
import type { SubscriptionPlan } from '../types/subscription';
import './Subscribe.css';

const Subscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [deviceCount, setDeviceCount] = useState(deviceLimits.default);

  useEffect(() => {
    const handleMainButtonClick = async () => {
      if (!selectedPlan) return;
      
      setIsLoading(true);
      try {
        const plan = subscriptionPlans.find(p => p.id === selectedPlan);
        if (!plan) throw new Error('План не найден');

        const totalAmount = plan.price * deviceCount;
        
        // Отправляем данные в бота
        WebApp.sendData(JSON.stringify({
          action: 'create_payment',
          plan_id: selectedPlan,
          device_count: deviceCount,
          amount: totalAmount
        }));

      } catch (error) {
        console.error('Payment error:', error);
        WebApp.showAlert('Произошла ошибка при создании платежа');
        setIsLoading(false);
      }
    };

    if (!selectedPlan) {
      WebApp.MainButton.hide();
      return;
    }

    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    const totalAmount = plan.price * deviceCount;

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
  }, [selectedPlan, deviceCount]);

  const handlePlanSelect = (planId: string) => {
    if (selectedPlan === planId) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(planId);
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
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.isPopular ? 'popular' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
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
