import { BudgetDBModel } from '../BudgetDBModel';
import { DB } from '../../DB';
import { BudgetCreationRequest } from '../controller/BudgetCreationRequest';
import { mapBudget } from './BudgetMapper';
import { Budget } from '../Budget';

export class BudgetService {
  async createNewBudget(userId: Number, budgetInfo: BudgetCreationRequest): Promise<Budget> {
    let budgetDBResp: BudgetDBModel
    const sequelize = DB.getInstance()
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

  async updateBudgetById(userId: number, budgetObj: BudgetCreationRequest, budgetId: number): Promise<any> {
    const sequelize = DB.getInstance()
    await sequelize.transaction(async transaction => {
      await BudgetDBModel.update({
        budgetTargetMonth: budgetObj.budgetTargetMonth,
        budgetTargetYear: budgetObj.budgetTargetYear,
        budget: budgetObj.budgetAmt
      }, { where: { id: budgetId, createdById: userId }, transaction })
    }).catch(err => {
      return new Error(err);
    })

    const budgetDBResp: BudgetDBModel = await BudgetDBModel.findByPk(budgetId)
    return mapBudget(budgetDBResp)
  }
}
