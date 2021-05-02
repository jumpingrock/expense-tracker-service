import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BudgetCreationRequest {
  @IsString()
  @IsNotEmpty()
  budgetTargetMonth: string;

  @IsString()
  @IsNotEmpty()
  budgetTargetYear: string;

  @IsNumber()
  @IsNotEmpty()
  budgetAmt: number;
}
