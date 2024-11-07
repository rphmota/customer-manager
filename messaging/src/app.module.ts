import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from '@config/env.config';
import { CustomersModule } from './modules/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { awsConfig } from '@config/aws.config';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, awsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        const awsConfig = config.get('SQS');

        return {
          consumers: [
            {
              name: 'customers-queue',
              queueUrl: awsConfig.URL,
              alwaysAcknowledge: true,
              region: config.get('AWS_REGION'),
              waitTimeSeconds: 1,
            },
          ],
        };
      },
    }),
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
