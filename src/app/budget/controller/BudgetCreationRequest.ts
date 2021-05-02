import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BudgetCreationRequest {
  @IsString()
  @IsNotEmpty()
  budgetTargetMonth: string;

  @IsNumber()
  @IsNotEmpty()
  budgetTargetYear: number;

  @IsNumber()
  @IsNotEmpty()
  budgetAmt: number;
}
