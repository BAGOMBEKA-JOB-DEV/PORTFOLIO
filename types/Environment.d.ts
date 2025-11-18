declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_COMMUNITY_API_KEY: string;
      DRIBBBLE_ACCESS_TOKEN: string;
      INSTAGRAM_ACCESS_TOKEN: string;
    }
  }

  interface Window {
    Calendly: {
      initBadgeWidget: (config: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
    };
  }
}

export {};
