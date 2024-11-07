import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { IsNull, Repository } from 'typeorm';
import { SqsService } from '@infra/messaging/sqs.message';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  let sqsService: SqsService;
  let customerRepository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: SqsService,
          useValue: {
            sendMessage: jest.fn().mockResolvedValue('Message sent'),
          },
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    sqsService = module.get<SqsService>(SqsService);
    customerRepository = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrUpdate', () => {
    it('should call sendMessage on SqsService with the correct data', async () => {
      const dto: CreateCustomerDto = {
        name: 'John Doe',
        salary: 5000,
        company_price: 10000,
      };
      await service.createOrUpdate(dto);
      expect(sqsService.sendMessage).toHaveBeenCalledWith(JSON.stringify(dto));
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers = [
        {
          id: 1,
          name: 'John Doe',
          salary: 5000,
          company_price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      jest.spyOn(customerRepository, 'find').mockResolvedValue(customers);

      const result = await service.findAll();
      expect(result).toEqual(customers);
      expect(customerRepository.find).toHaveBeenCalledWith({
        where: { deletedAt: IsNull() },
      });
    });
  });

  describe('softDelete', () => {
    it('should soft delete a customer by setting deletedAt', async () => {
      const customer = { id: 1, deletedAt: null } as Customer;
      jest.spyOn(customerRepository, 'findOne').mockResolvedValue(customer);
      jest
        .spyOn(customerRepository, 'save')
        .mockResolvedValue({ ...customer, deletedAt: new Date() });

      await service.softDelete(1);
      expect(customerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, deletedAt: IsNull() },
      });
      expect(customerRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          deletedAt: expect.any(Date),
        }),
      );
    });

    it('should throw NotFoundException if customer is not found', async () => {
      jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null);

      await expect(service.softDelete(2)).rejects.toThrow(NotFoundException);
      expect(customerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 2, deletedAt: IsNull() },
      });
    });
  });
});
