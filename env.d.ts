declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    NEXT_PUBLIC_PROD_URL: string;
    NEXT_PUBLIC_DEV_URL: string;
    JWT_SECRET: string;
  }
}
