import {
  HasOne,
  BelongsTo,
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
import { MedicalEquipment } from 'src/medical_equipments/models/medical_equipment.model';
import { Repair } from 'src/repairs/models/repair.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withUser: {
    include: {
      model: User.scope(['withoutPassword', 'withoutTimestamp']),
      as: 'user',
    },
  },
  withMedicalEquipment: {
    include: {
      model: MedicalEquipment.scope(['withoutTimestamp', 'withRoom']),
      as: 'medical_equipment',
    },
  },
  withRepair: {
    include: {
      model: Repair,
      as: 'repair',
    },
  },
}))
@Table({
  tableName: 'complains',
  underscored: true,
  paranoid: true,
})
export class Complain extends Model {
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
  complain_date: Date;

  @Column
  priority: boolean;

  @Column
  note: string;

  @BelongsTo(() => User, 'user_id')
  user?: Partial<User>;

  @Column
  image_path: string;

  @Column
  condition: string;

  @Column
  status: string;

  @Column
  unique_key: string;

  @BelongsTo(() => MedicalEquipment, 'medical_equipment_id')
  medical_equipment?: Partial<MedicalEquipment>;

  @HasOne(() => Repair, 'complain_id')
  repair?: Partial<Repair>;
}
