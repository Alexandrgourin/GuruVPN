import { FC } from 'react';
import { Button } from '@vkontakte/vkui';
import { deviceLimits } from '../../config/subscriptionPlans';
import './DeviceCounter.css';

interface DeviceCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const DeviceCounter: FC<DeviceCounterProps> = ({
  value,
  onChange,
  min = deviceLimits.min,
  max = deviceLimits.max,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="device-counter">
      <div className="device-counter-label">
        Количество устройств
      </div>
      <div className="device-counter-controls">
        <Button
          size="l"
          appearance="negative"
          onClick={handleDecrease}
          disabled={value <= min}
        >
          -
        </Button>
        <span className="device-counter-value">{value}</span>
        <Button
          size="l"
          appearance="positive"
          onClick={handleIncrease}
          disabled={value >= max}
        >
          +
        </Button>
      </div>
    </div>
  );
};
