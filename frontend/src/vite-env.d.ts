/// <reference types="vite/client" />
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        close: () => void;
      };
    };
  }
}
