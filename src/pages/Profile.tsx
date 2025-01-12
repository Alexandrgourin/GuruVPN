import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { api } from '../services/api';
import type { UserProfile, Payment } from '../services/api';
import { subscriptionPlans } from '../config/subscriptionPlans';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const userProfile = await api.getUserProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        WebApp.showAlert('Ошибка при получении данных профиля');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getPlanName = (planId: string) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    return plan?.name || 'Неизвестный тариф';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPaymentStatus = (status: Payment['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'Оплачен';
      case 'PENDING':
        return 'Ожидает оплаты';
      case 'CANCELLED':
        return 'Отменен';
      default:
        return status;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page">
      <h1>Профиль</h1>

      {profile?.subscription && (
        <div className="subscription-section">
          <h2>Текущая подписка</h2>
          <div className="subscription-card">
            <div className={`subscription-status ${profile.subscription.status.toLowerCase()}`}>
              {profile.subscription.status === 'ACTIVE' ? 'Активна' : 
               profile.subscription.status === 'EXPIRED' ? 'Истекла' :
               'Ожидает оплаты'}
            </div>
            <div className="subscription-details">
              <p><strong>Тариф:</strong> {getPlanName(profile.subscription.planId)}</p>
              <p><strong>Устройств:</strong> {profile.subscription.deviceCount}</p>
              <p><strong>Действует до:</strong> {formatDate(profile.subscription.endDate)}</p>
            </div>
            {profile.subscription.status === 'EXPIRED' && (
              <button className="primary-button" onClick={() => navigate('/subscribe')}>
                Продлить подписку
              </button>
            )}
          </div>
        </div>
      )}

      {profile?.payments.length > 0 && (
        <div className="payments-section">
          <h2>История платежей</h2>
          <div className="payments-list">
            {profile.payments.map(payment => (
              <div key={payment.id} className="payment-card">
                <div className="payment-header">
                  <span className="payment-date">{formatDate(payment.createdAt)}</span>
                  <span className={`payment-status ${payment.status.toLowerCase()}`}>
                    {formatPaymentStatus(payment.status)}
                  </span>
                </div>
                <div className="payment-details">
                  <p><strong>Тариф:</strong> {getPlanName(payment.planId)}</p>
                  <p><strong>Устройств:</strong> {payment.deviceCount}</p>
                  <p><strong>Сумма:</strong> {formatAmount(payment.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!profile?.subscription && !profile?.payments.length && (
        <div className="empty-profile">
          <p>У вас пока нет подписок и платежей</p>
          <button className="primary-button" onClick={() => navigate('/subscribe')}>
            Оформить подписку
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
