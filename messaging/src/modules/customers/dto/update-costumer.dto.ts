import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

export class UpdateCustomerDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  company_price: number;

  @IsNumber()
  @IsPositive()
  salary: number;
}
