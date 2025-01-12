import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

const Subscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      title: '1 месяц',
      description: 'Базовый план',
      price: 299,
      duration: 1
    },
    {
      id: 'yearly',
      title: '12 месяцев',
      description: 'Выгодное предложение',
      price: 2990,
      duration: 12
    }
  ];

  useEffect(() => {
    const handleMainButtonClick = () => {
      if (!selectedPlan) return;
      setIsLoading(true);
      // Здесь будет логика обработки подписки
      setTimeout(() => setIsLoading(false), 2000);
    };

    if (selectedPlan) {
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({
        text: 'Оплатить',
        is_active: true,
        color: '#2ea664'
      });
      WebApp.MainButton.onClick(handleMainButtonClick);
      return () => WebApp.MainButton.offClick(handleMainButtonClick);
    } else {
      WebApp.MainButton.hide();
      const noop = () => {};
      return () => WebApp.MainButton.offClick(noop);
    }
  }, [selectedPlan]);

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
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <div className="price">
              <span className="amount">{plan.price} ₽</span>
              <span className="period">/{plan.duration === 1 ? 'месяц' : 'год'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
