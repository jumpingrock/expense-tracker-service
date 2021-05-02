import { BudgetDBModel } from '../BudgetDBModel';
import { DB } from '../../DB';
import { BudgetCreationRequest } from '../controller/BudgetCreationRequest';
import { mapCreatedBudget } from './BudgetMapper';
import { Budget } from '../Budget';
import { TargetMonthEnum } from '../TargetMonthEnum';
import { Logger } from '../../../logger/logger';

export class BudgetService {
  async createNewBudget(userId: Number, budgetInfo: BudgetCreationRequest): Promise<Budget> {
    let budgetDBResp: any
    const sequelize = DB.getInstance()
    Logger.getInstance().debug('this is the targetMonthEnum', TargetMonthEnum[budgetInfo.budgetTargetMonth])
    await sequelize.transaction(async transaction => {
      budgetDBResp = await BudgetDBModel.create({
        createdById: userId,
        budgetTargetMonth: budgetInfo.budgetTargetMonth,
        budgetTargetYear: budgetInfo.budgetTargetYear,
        budget: budgetInfo.budgetAmt
      }, { transaction })
    }).catch(err => {
      return new Error(err);
    })

    return mapCreatedBudget(budgetDBResp)
  }

  // async getUserBudget(userId: Number): Promise<Budget> {
  //   const getBudget = BudgetDBModel.findOne({ where: { userId } })
  //   return null
  // }
}
