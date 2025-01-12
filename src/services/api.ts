import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export interface User {
  id: string;
  telegramId: string;
  username: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  planId: string;
  deviceCount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  planId: string;
  deviceCount: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface UserProfile {
  subscription: Subscription | null;
  payments: Payment[];
}

export const api = {
  async initUser(telegramId: string | number, username?: string): Promise<User> {
    const response = await axios.post(`${API_URL}/users/init`, {
      telegramId: String(telegramId),
      username,
    });
    return response.data;
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    const response = await axios.get(`${API_URL}/users/${userId}/profile`);
    return response.data;
  },

  async createSubscription(userId: string, planId: string, deviceCount: number): Promise<Subscription> {
    const response = await axios.post(`${API_URL}/subscriptions`, {
      userId,
      planId,
      deviceCount,
    });
    return response.data;
  },

  async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      const response = await axios.get(`${API_URL}/subscriptions/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
