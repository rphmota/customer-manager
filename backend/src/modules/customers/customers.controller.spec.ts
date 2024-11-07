import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            createOrUpdate: jest.fn(),
            findAll: jest
              .fn()
              .mockResolvedValue([
                { id: 1, name: 'John Doe', salary: 5000, company_price: 10000 },
              ]),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrUpdate', () => {
    it('should call createOrUpdate on the service with the correct data', async () => {
      const dto: CreateCustomerDto = {
        name: 'John Doe',
        salary: 5000,
        company_price: 10000,
      };
      await controller.createOrUpdate(dto);
      expect(service.createOrUpdate).toHaveBeenCalledWith(dto);
    });
  });

  describe('list', () => {
    it('should return an array of customers', async () => {
      const result = await controller.list();
      expect(result).toEqual([
        { id: 1, name: 'John Doe', salary: 5000, company_price: 10000 },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('softDelete', () => {
    it('should call softDelete on the service with the correct ID', async () => {
      const id = 1;
      await controller.softDelete(id);
      expect(service.softDelete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if the service throws it', async () => {
      const id = 2;
      jest
        .spyOn(service, 'softDelete')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.softDelete(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
