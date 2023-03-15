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
}
