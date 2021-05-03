import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param, Patch,
  Post,
} from 'routing-controllers';
import { ExpenseRequest } from './ExpenseRequest';
import { ExpenseService } from '../service/ExpenseService';
import { Expense } from '../Expense';

@JsonController('/expense')
export class ExpenseController {
  @Authorized()
  @Post()
  @OnUndefined(201)
  async createExpense(
  @CurrentUser() userId,
  @Body() requestParam: ExpenseRequest,): Promise<Expense> {
    return await new ExpenseService().createNewExpense(userId, requestParam)
  }

  @Authorized()
  @Get('/budgetId/:budget_by_id')
  @OnUndefined(201)
  async getExpensesByBudget(
    @CurrentUser() userId: number,
    @Param('budget_by_id') budgetById: number): Promise<Expense[]> {
    return await new ExpenseService().getExpensesByBudgetById(userId, budgetById)
  }

  @Authorized()
  @Delete('/expenseId/:expense_id')
  @OnUndefined(201)
  async deleteExpense(
    @CurrentUser() userId: number,
    @Param('expense_id') expenseId: number): Promise<any> {
    return await new ExpenseService().deleteExpenseById(userId, expenseId)
  }

  @Authorized()
  @Patch('/expenseId/:expense_id')
  @OnUndefined(201)
  async updateExpense(
    @CurrentUser() userId: number,
    @Param('expense_id') expenseId: number,
    @Body() requestParam: ExpenseRequest,): Promise<any> {
    return await new ExpenseService().updateExpenseById(userId, requestParam, expenseId)
  }
}
