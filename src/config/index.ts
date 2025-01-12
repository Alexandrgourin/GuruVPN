const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const YOOKASSA_SHOP_ID = import.meta.env.VITE_YOOKASSA_SHOP_ID;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('VITE_TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

if (!YOOKASSA_SHOP_ID) {
  console.error('VITE_YOOKASSA_SHOP_ID is not defined in environment variables');
}

export const config = {
  TELEGRAM_BOT_TOKEN,
  YOOKASSA_SHOP_ID,
} as const;
