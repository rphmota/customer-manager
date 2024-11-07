import 'dotenv/config';

export const databaseConfig = () => ({
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASS: process.env.DATABASE_PASS,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_PORT: Number.parseInt(process.env.PORT ?? `9090`),
});
