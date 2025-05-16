declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: Promise<any>;
        close: () => void;
      };
    };
  }
}

export {}; // This is needed to make this file a module
