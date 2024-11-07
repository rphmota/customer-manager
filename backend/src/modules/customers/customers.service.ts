import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SqsService } from '@infra/messaging/sqs.message';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(SqsService)
    private readonly messagingService: SqsService,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createOrUpdate(instance: CreateCustomerDto) {
    return await this.messagingService.sendMessage(JSON.stringify(instance));
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: {
        deletedAt: IsNull(), // Buscar apenas registros não deletados logicamente
      },
    });
  }
  async softDelete(id: number): Promise<void> {
    const customer = await this.customerRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${id} not found or already deleted`,
      );
    }

    customer.deletedAt = new Date();
    await this.customerRepository.save(customer);
  }
}
