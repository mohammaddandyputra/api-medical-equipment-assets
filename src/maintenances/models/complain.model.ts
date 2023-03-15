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
import { MedicalEquipment } from 'src/medical_equipments/models/medical_equipment.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
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
}
