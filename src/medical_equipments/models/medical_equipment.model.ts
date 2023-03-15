import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/rooms/models/room.model';
import { MedicalEquipmentAccessories } from './medical_equipment_accessories.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withRoom: {
    attributes: {
      exclude: ['room_id'],
    },
    include: {
      model: Room.scope(['withoutTimestamp', 'withFloor']),
      as: 'room',
    },
  },
  withAccessories: {
    include: {
      model: MedicalEquipmentAccessories,
      as: 'accessories',
    },
  },
}))
@Table({
  tableName: 'medical_equipments',
  underscored: true,
  paranoid: true,
})
export class MedicalEquipment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Room)
  @Column(DataType.UUID)
  room_id: string;

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
  source_of_funds: string;

  @Column
  condition: string;

  @Column
  ownership_type: string;

  @Column
  procurement_date: Date;

  @Column
  operating_year: Date;

  @BelongsTo(() => Room, 'room_id')
  room?: Partial<Room>;

  @HasMany(() => MedicalEquipmentAccessories, 'medical_equipment_id')
  accessories: MedicalEquipmentAccessories[];
}
