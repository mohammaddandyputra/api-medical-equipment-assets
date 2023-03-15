import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Complain } from 'src/complains/models/complain.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
}))
@Table({
  tableName: 'repairs',
  underscored: true,
  paranoid: true,
})
export class Repair extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Complain)
  @Column(DataType.UUID)
  complain_id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @Column
  repair_date: Date;

  @Column
  condition: string;

  @Column
  note: string;
}
