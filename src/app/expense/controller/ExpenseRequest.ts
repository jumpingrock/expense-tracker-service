import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExpenseRequest {
  @IsNumber()
  @IsNotEmpty()
  budgetById: number;

  @IsString()
  @IsNotEmpty()
  creditOrDebit: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
