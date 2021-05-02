import { Authorized, Body, CurrentUser, Get, JsonController, OnUndefined, Post } from 'routing-controllers';
import { BudgetCreationRequest } from './BudgetCreationRequest';
import { BudgetService } from '../service/BudgetService';
import { Budget } from '../Budget';

@JsonController('/newBudget')
export class BudgetController {
  @Authorized()
  @Post()
  @OnUndefined(201)
  async createBudget(
  @CurrentUser() userId,
  @Body() requestParam: BudgetCreationRequest,
  ): Promise<Budget> {
    return await new BudgetService().createNewBudget(userId, requestParam)
  }

  // @Authorized
  // @Get()
  // async getUserBudget(
  //   @CurrentUser() userId,
  // ): Promise<Budget[]>{
  //   return await new BudgetService().getUserBudget(userId)
  // }
}