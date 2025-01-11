import React from 'react';
import WebApp from '@twa-dev/sdk';

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
  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      // Отправляем событие в бота для создания счета
      WebApp.sendData(JSON.stringify({
        action: 'subscribe',
        plan: plan.id,
      }));

      // Показываем сообщение пользователю
      await WebApp.showPopup({
        title: 'Подписка',
        message: `Вы выбрали план "${plan.title}". Стоимость ${plan.price} руб.`,
        buttons: [
          { id: 'pay', type: 'default', text: 'Оплатить' },
          { id: 'cancel', type: 'cancel', text: 'Отмена' },
        ],
      });
    } catch (error) {
      console.error('Payment error:', error);
      WebApp.showAlert('Произошла ошибка при оформлении подписки');
    }
  };

  return (
    <div className="subscribe-container">
      <h2>Выберите план подписки</h2>
      <div className="subscription-plans">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
            <p className="price">{plan.price} ₽</p>
            <button onClick={() => handleSubscribe(plan)}>
              Выбрать план
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
