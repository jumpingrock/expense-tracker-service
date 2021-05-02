import { BudgetDBModel } from '../BudgetDBModel';
import { Budget } from '../Budget';

export const mapCreatedBudget = (budgetDBModel: BudgetDBModel): Budget => {
  const budget : Budget = {
    id: budgetDBModel.id,
    createdById: budgetDBModel.createdById,
    budgetTargetMonth: budgetDBModel.budgetTargetMonth,
    budgetTargetYear: budgetDBModel.budgetTargetYear,
    budget: budgetDBModel.budget,
    createdAt: budgetDBModel.createdAt,
    updatedAt: budgetDBModel.updatedAt
  }
  return budget
}
