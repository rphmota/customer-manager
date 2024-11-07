import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASS || 'postgres',
  database: process.env.DATABASE_NAME || 'manager',
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['src/infra/database/typeorm/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});

