import { Injectable, NotFoundException } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message, SQSClient } from '@aws-sdk/client-sqs';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-costumer.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CustomersService {
  private sqsClient: SQSClient;

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  @SqsMessageHandler('customers-queue', false)
  public async handleMessage(message: Message) {
    try {
      const body = JSON.parse(message.Body);

      if (body.id) {
        await this.updateCustomer(body);
      } else {
        await this.createCustomer(body);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  private async createCustomer(body: any) {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.name = body.name;
    createCustomerDto.company_price = body.company_price;
    createCustomerDto.salary = body.salary;

    await validateOrReject(createCustomerDto);

    const customer = this.customerRepository.create(createCustomerDto);
    await this.customerRepository.save(customer);

    console.log('Customer created:', customer);
  }

  private async updateCustomer(body: any) {
    const updateCustomerDto = new UpdateCustomerDto();
    updateCustomerDto.id = body.id;
    updateCustomerDto.name = body.name;
    updateCustomerDto.company_price = body.company_price;
    updateCustomerDto.salary = body.salary;

    await validateOrReject(updateCustomerDto);

    const customer = await this.customerRepository.findOne({
      where: { id: updateCustomerDto.id },
    });
    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${updateCustomerDto.id} not found`,
      );
    }

    customer.name = updateCustomerDto.name;
    customer.company_price = updateCustomerDto.company_price;
    customer.salary = updateCustomerDto.salary;

    await this.customerRepository.save(customer);

    console.log('Customer updated:', customer);
  }

  @SqsConsumerEventHandler('customers-queue', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    if (error) console.error('Processing error:', error);
    else console.log('Processing message:', message);
  }
}
