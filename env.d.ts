declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}
