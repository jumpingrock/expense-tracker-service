import { ExpenseDBModel } from '../ExpenseDBModel';
import { Expense } from '../Expense';

export const ExpenseMapper = (expCreated: ExpenseDBModel): Expense => {
  const expenseRespObj: Expense = {
    id: expCreated.id,
    createdById: expCreated.createdById,
    budgetById: expCreated.budgetById,
    creditOrDebit: expCreated.creditOrDebit,
    amount: expCreated.amount,
    createdAt: expCreated.createdAt,
    updatedAt: expCreated.updatedAt,
  }
  return expenseRespObj
}
