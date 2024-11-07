import { DataSource } from 'typeorm';
import { databaseConfig } from '@config/env.config';

const config = databaseConfig();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE_HOST || 'localhost',
  port: parseInt(config.DATABASE_PORT as string, 10) || 5432,
  username: config.DATABASE_USER || 'postgres',
  password: config.DATABASE_PASS || 'postgres',
  database: config.DATABASE_NAME || 'url',
  //schema: 'app',
  entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});
