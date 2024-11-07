import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;
  company_price: number;
  salary: number;
}
