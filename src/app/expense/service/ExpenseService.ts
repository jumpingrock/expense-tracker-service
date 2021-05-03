import { Expense } from '../Expense';
import { ExpenseRequest } from '../controller/ExpenseRequest';

export class ExpenseService {
  async createNewExpense (userId: number, expenseObj: ExpenseRequest): Promise<any> {
    return Promise.resolve(expenseObj)
  }
}
