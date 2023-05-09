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
import { BuildingFloor } from 'src/buildings/models/building_floor.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withFloor: {
    attributes: {
      exclude: ['floor_id'],
    },
    include: {
      model: BuildingFloor.scope(['withoutTimestamp', 'withBuilding']),
      as: 'floor',
    },
  },
}))
@Table({
  tableName: 'building_rooms',
  underscored: true,
  paranoid: true,
})
export class Room extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => BuildingFloor)
  @Column(DataType.UUID)
  floor_id: string;

  @Column
  name: string;

  @Column
  function: string;

  @Column
  room_area: number;

  @BelongsTo(() => BuildingFloor, 'floor_id')
  floor: BuildingFloor;

  @Column
  image_path: string;
}
