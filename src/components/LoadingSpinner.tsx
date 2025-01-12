import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = 'var(--tg-theme-button-color)'
}) => {
  const sizeMap = {
    small: '20px',
    medium: '30px',
    large: '40px'
  };

  return (
    <div 
      className="loading-spinner"
      style={{ 
        width: sizeMap[size],
        height: sizeMap[size],
        borderColor: color,
        borderTopColor: 'transparent'
      }}
    />
  );
};

export default LoadingSpinner;
