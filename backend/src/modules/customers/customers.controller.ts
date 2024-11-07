import {
  Body,
  Get,
  Post,
  Controller,
  NotFoundException,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createOrUpdate(@Body() dto: CreateCustomerDto) {
    try {
      await this.customersService.createOrUpdate(dto);
    } catch (error) {
      console.error('Error creating or edit customer:', error);
      throw error;
    }
  }

  @Get()
  async list(): Promise<Customer[]> {
    try {
      return await this.customersService.findAll();
    } catch (error) {
      console.error('Error listing customers:', error);
      throw error;
    }
  }
  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.customersService.softDelete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error(`Customer with ID ${id} not found or already deleted.`);
        throw error;
      }
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}
