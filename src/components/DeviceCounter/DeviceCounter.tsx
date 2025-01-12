import { useState } from 'react';
import { deviceLimits } from '../../config/subscriptionPlans';
import './DeviceCounter.css';

interface DeviceCounterProps {
  value: number;
  onChange: (count: number) => void;
}

const DeviceCounter = ({ value, onChange }: DeviceCounterProps) => {
  const handleIncrement = () => {
    if (value < deviceLimits.max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > deviceLimits.min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="device-counter">
      <div className="device-counter-label">
        Количество устройств
      </div>
      <div className="device-counter-controls">
        <button
          className="device-counter-button"
          onClick={handleDecrement}
          disabled={value <= deviceLimits.min}
        >
          -
        </button>
        <span className="device-counter-value">{value}</span>
        <button
          className="device-counter-button"
          onClick={handleIncrement}
          disabled={value >= deviceLimits.max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DeviceCounter;
