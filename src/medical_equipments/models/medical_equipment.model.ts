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
import { Complain } from 'src/complains/models/complain.model';
import { Maintenance } from 'src/maintenances/models/maintenance.model';
import { Repair } from 'src/repairs/models/repair.model';
import { Room } from 'src/rooms/models/room.model';
import { MedicalEquipmentAccessories } from 'src/medical_equipment_accessories/models/medical_equipment_accessories.model';
import { User } from 'src/users/models/user.model';

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
  withMaintenances: {
    include: {
      model: Maintenance, // .scope(['withUser'])
      as: 'maintenances',
    },
  },
  withComplains: {
    include: {
      model: Complain, // .scope(['withUser'])
      as: 'complains',
    },
  },
  withRepairs: {
    include: {
      model: Repair, // .scope(['withUser'])
      as: 'repairs',
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
  operating_year: string;

  @Column
  image_path: string;

  @BelongsTo(() => Room, 'room_id')
  room?: Partial<Room>;

  @HasMany(() => MedicalEquipmentAccessories, 'medical_equipment_id')
  accessories: MedicalEquipmentAccessories[];

  @HasMany(() => Maintenance, 'medical_equipment_id')
  maintenances: Maintenance[];

  @HasMany(() => Complain, 'medical_equipment_id')
  complains: Complain[];

  @HasMany(() => Repair, 'medical_equipment_id')
  repairs: Repair[];
}
