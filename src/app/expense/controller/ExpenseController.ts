import { Authorized, Body, CurrentUser, JsonController, OnUndefined, Post } from 'routing-controllers';
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
    @Body() requestParam: ExpenseRequest,
  ): Promise<Expense> {
    return await new ExpenseService().createNewExpense(userId, requestParam)
  }
}
