import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column, CreatedAt,
  DataType,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { UserDBModel } from '../user/UserDBModel';
import { TargetMonthEnum } from './TargetMonthEnum';
import { ExpenseDBModel } from '../expense/ExpenseDBModel';

@Table({
  tableName: 'budget',
})
export class BudgetDBModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => UserDBModel)
  @AllowNull(false)
  @Column({ field: 'created_by_id', type: DataType.INTEGER })
  createdById: number;

  @BelongsTo(() => UserDBModel, 'created_by_id')
  createdBy: UserDBModel;

  @AllowNull(false)
  @Column({
    field: 'budget_target_month',
    type: DataType.STRING,
  })
  budgetTargetMonth: TargetMonthEnum;

  @AllowNull(false)
  @Column({
    field: 'budget_target_year',
    type: DataType.INTEGER,
  })
  budgetTargetYear: number;

  @AllowNull(false)
  @Column({
    field: 'budget',
    type: DataType.NUMBER,
  })
  budget: number;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  public readonly createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  public readonly updatedAt: Date;

  @HasMany(() => ExpenseDBModel)
  activityLog: ExpenseDBModel[];
}
