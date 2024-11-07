import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  company_price: number;

  @IsNumber()
  @IsPositive()
  salary: number;
}
