export interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  isPopular?: boolean;
}

export interface SubscriptionOrder {
  planId: string;
  deviceCount: number;
  totalAmount: number;
  userId: number;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  error?: string;
}
