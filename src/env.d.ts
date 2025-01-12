/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TELEGRAM_BOT_TOKEN: string;
  readonly VITE_YOOKASSA_SHOP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
