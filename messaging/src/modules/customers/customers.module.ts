import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Customer])],
  controllers: [],
  providers: [CustomersService],
})
export class CustomersModule {}
