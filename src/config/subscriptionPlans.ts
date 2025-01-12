import { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    title: '1 месяц',
    description: 'Базовый план для знакомства с сервисом',
    price: 199,
    duration: 1
  },
  {
    id: 'quarterly',
    title: '3 месяца',
    description: 'Оптимальный выбор для большинства пользователей',
    price: 450,
    duration: 3,
    isPopular: true
  },
  {
    id: 'semi_annual',
    title: '6 месяцев',
    description: 'Выгодное предложение для постоянных клиентов',
    price: 750,
    duration: 6
  },
  {
    id: 'annual',
    title: '12 месяцев',
    description: 'Максимальная выгода при длительном использовании',
    price: 1200,
    duration: 12
  }
];

export const deviceLimits = {
  min: 1,
  max: 10,
  default: 1
};
