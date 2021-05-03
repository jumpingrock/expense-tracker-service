import { ExpenseRequest } from '../controller/ExpenseRequest';
import { DB } from '../../DB';
import { ExpenseDBModel } from '../ExpenseDBModel';
import { ExpenseMapper } from './ExpenseMapper';
import { Expense } from '../Expense';
import { BudgetDBModel } from '../../budget/BudgetDBModel';

export class ExpenseService {
  async createNewExpense (userId: number, expenseObj: ExpenseRequest): Promise<Expense> {
    const isBudgetPresent = await BudgetDBModel.findByPk(expenseObj.budgetById)
    if (!isBudgetPresent) {
      return Promise.reject(new Error('Budget not found'))
    }

    let expenseDBResp: any
    const sequelize = DB.getInstance()
    await sequelize.transaction(async (transaction) => {
      expenseDBResp = await ExpenseDBModel.create({
        createdById: userId,
        budgetById: expenseObj.budgetById,
        creditOrDebit: expenseObj.creditOrDebit,
        amount: expenseObj.amount
      }, { transaction })
    }).catch(err => {
      return Promise.reject(new Error(err))
    })

    return ExpenseMapper(expenseDBResp)
  }
}
