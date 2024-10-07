declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    IMAGEKIT_PUBLIC_KEY: string;
    IMAGEKIT_PRIVATE_KEY: string;
    IMAGEKIT_URL_ENDPOINT: string;
    JWT_SECRET: string;
  }
}
