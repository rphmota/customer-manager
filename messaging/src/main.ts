import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SQSClient } from '@aws-sdk/client-sqs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.listen('4040');
  await app.startAllMicroservices();
}
bootstrap();
