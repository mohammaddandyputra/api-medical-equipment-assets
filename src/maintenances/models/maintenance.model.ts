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
import { MedicalEquipment } from 'src/medical_equipments/models/medical_equipment.model';
import { MaintenanceAction } from './maintenance_actions.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withUser: {
    include: {
      model: User.scope(['withoutTimestamp']),
      as: 'user',
    },
  },
  withActions: {
    include: {
      model: MaintenanceAction, // .scope(['withoutTimestamp'])
      as: 'actions',
    },
  },
}))
@Table({
  tableName: 'maintenances',
  underscored: true,
  paranoid: true,
})
export class Maintenance extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => MedicalEquipment)
  @Column(DataType.UUID)
  medical_equipment_id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @Column
  maintenance_date: Date;

  @Column
  temperature: string;

  @Column
  humidity: string;

  @Column
  electricity: boolean;

  @Column
  condition: string;

  @Column
  note: string;

  @BelongsTo(() => User, 'user_id')
  user?: Partial<User>;

  @HasMany(() => MaintenanceAction, 'maintenance_id')
  actions: MaintenanceAction[];

  image_path: string;
}
