declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PERPLEXITY_API_KEY: string;
      NODE_ENV: 'development' | 'production';
      // Add other environment variables here as needed
    }
  }
}

export {};
