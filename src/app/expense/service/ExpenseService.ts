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

  async getExpensesByBudgetById (userId: number, budgetById: number): Promise<Expense[]> {
    const expenses: any = await ExpenseDBModel
      .findAll({ where: { budgetById: budgetById }, order: [['createdAt', 'DESC']], })
    return expenses.map((expense) => ExpenseMapper(expense))
  }

  async deleteExpenseById (userId: number, expenseId: number): Promise<any> {
    return await ExpenseDBModel.destroy({ where: { id: expenseId, createdById: userId } })
  }

  async updateExpenseById (userId: number, expenseObj: ExpenseRequest, expenseId: number): Promise<Expense> {
    const sequelize = DB.getInstance()
    await sequelize.transaction(async (transaction) => {
      await ExpenseDBModel.update({
        creditOrDebit: expenseObj.creditOrDebit,
        amount: expenseObj.amount
      }, { where: { id: expenseId, createdById: userId } })
    })
    const expenseDBResp: any = await ExpenseDBModel.findByPk(expenseId)
    return ExpenseMapper(expenseDBResp)
  }
}
