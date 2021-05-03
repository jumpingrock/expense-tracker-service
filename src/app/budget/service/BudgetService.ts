import { BudgetDBModel } from '../BudgetDBModel';
import { DB } from '../../DB';
import { BudgetCreationRequest } from '../controller/BudgetCreationRequest';
import { mapBudget } from './BudgetMapper';
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

    return mapBudget(budgetDBResp)
  }

  async getListOfUserBudget(userId: number): Promise<Budget[]> {
    const budgets: any = await BudgetDBModel.findAll({ where: { createdById: userId }, order: [['createdAt', 'DESC']], })
      .catch(err => {
        return new Error(err);
      })
    return budgets.map(budget => mapBudget(budget))
  }
}
