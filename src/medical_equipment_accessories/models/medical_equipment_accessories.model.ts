import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';

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

  // @ForeignKey(() => MedicalEquipment)
  @Column(DataType.UUID)
  medical_equipment_id: string;

  @Column
  name: string;

  @Column
  merk: string;

  @Column
  type: string;

  @Column
  sn: string;

  @Column
  purchase_price: number;

  @Column
  image_path: string;
}
