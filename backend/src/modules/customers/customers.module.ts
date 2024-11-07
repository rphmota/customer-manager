import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { SqsService } from '@infra/messaging/sqs.message';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [SqsService, CustomersService],
})
export class CustomersModule {}
