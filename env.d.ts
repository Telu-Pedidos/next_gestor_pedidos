declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    JWT_SECRET: string;
    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;
  }
}
