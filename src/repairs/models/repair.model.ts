import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Complain } from 'src/complains/models/complain.model';
import { MedicalEquipment } from 'src/medical_equipments/models/medical_equipment.model';
import { RepairAction } from './repair_action.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withComplain: {
    include: {
      model: Complain.scope([
        'withoutTimestamp',
        'withUser',
        'withMedicalEquipment',
      ]),
      as: 'complain',
    },
  },
  withUser: {
    include: {
      model: User,
      as: 'user',
    },
  },
  withActions: {
    include: {
      model: RepairAction,
      as: 'actions',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
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

  @ForeignKey(() => MedicalEquipment)
  @Column(DataType.UUID)
  medical_equipment_id: string;

  @Column
  repair_date: Date;

  @Column
  condition: string;

  @Column
  note: string;

  @Column
  image_path: string;

  @BelongsTo(() => User, 'user_id')
  user?: Partial<User>;

  @BelongsTo(() => Complain, 'complain_id')
  complain?: Partial<Complain>;

  @HasMany(() => RepairAction, 'repair_id')
  actions?: RepairAction[];
}
