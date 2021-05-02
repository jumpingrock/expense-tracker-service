import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column, CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { UserDBModel } from '../user/UserDBModel';
import { BudgetDBModel } from '../budget/BudgetDBModel';

@Table({
  tableName: 'expense',
})
export class ExpenseDBModel extends Model {
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

  @ForeignKey(() => BudgetDBModel)
  @AllowNull(false)
  @Column({ field: 'budget_by_id', type: DataType.INTEGER })
  budgetById: number;

  @BelongsTo(() => BudgetDBModel, 'budget_by_id')
  budgetBy: UserDBModel;

  @AllowNull(false)
  @Column({
    field: 'credit_or_debit',
    type: DataType.STRING,
  })
  creditOrDebit: String;

  @AllowNull(false)
  @Column({
    field: 'amount',
    type: DataType.FLOAT,
  })
  amount: Number;

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
}
