import React from 'react';
import { WebApp } from '@telegram-apps/sdk';

const Profile: React.FC = () => {
  const user = WebApp.initDataUnsafe.user;

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {user && (
        <div className="user-info">
          <p>ID: {user.id}</p>
          <p>Имя: {user.first_name} {user.last_name}</p>
          <p>Username: @{user.username}</p>
        </div>
      )}
      
      <div className="subscription-info">
        <h3>Информация о подписке</h3>
        {/* Здесь будет информация о текущей подписке */}
      </div>
    </div>
  );
};

export default Profile;
