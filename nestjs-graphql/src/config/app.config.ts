import { registerAs } from '@nestjs/config';

const appConfig = registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
}));

export default appConfig;
