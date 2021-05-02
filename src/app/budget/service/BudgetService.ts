import { BudgetDBModel } from '../BudgetDBModel';
import { DB } from '../../DB';
import { BudgetCreationRequest } from '../controller/BudgetCreationRequest';
import { mapCreatedBudget } from './BudgetMapper';
import { Budget } from '../Budget';

export class BudgetService {
  async createNewBudget(userId: Number, budgetInfo: BudgetCreationRequest): Promise<Budget> {
    let budgetDBResp: any
    const sequelize = DB.getInstance()
    const budgetTargetDate = Date.now()
    await sequelize.transaction(async transaction => {
      budgetDBResp = await BudgetDBModel.create({
        createdById: userId,
        budgetTargetMonth: budgetTargetDate,
        budgetTargetYear: budgetTargetDate,
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
