import {
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
import { MedicalEquipment } from './medical_equipment.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
}))
@Table({
  tableName: 'medical_equipment_accessories',
  underscored: true,
  paranoid: true,
})
export class MedicalEquipmentAccessories extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => MedicalEquipment)
  @Column(DataType.UUID)
  medical_equipment_id: string;

  @Column
  name: string;

  @Column
  merk: string;

  @Column
  type: string;

  @Column
  purchase_price: number;

  @BelongsTo(() => MedicalEquipment, 'medical_equipment_id')
  accessories: MedicalEquipment;
}
