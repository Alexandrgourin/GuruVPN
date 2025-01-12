export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  CREATE_PAYMENT: `${API_BASE_URL}/subscriptions/payment`,
  CREATE_USER: `${API_BASE_URL}/users`,
} as const;
