import { TargetMonthEnum } from './TargetMonthEnum';

export class Budget {
  id: number;
  createdById: number;
  budgetTargetMonth: TargetMonthEnum;
  budgetTargetYear: number;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}
