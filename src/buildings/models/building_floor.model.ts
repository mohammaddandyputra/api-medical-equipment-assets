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
import { Building } from './building.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withBuilding: {
    attributes: {
      exclude: ['building_id'],
    },
    include: {
      model: Building.scope(['withoutTimestamp']),
      as: 'building',
    },
  },
}))
@Table({
  tableName: 'building_floors',
  underscored: true,
  paranoid: true,
})
export class BuildingFloor extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Building)
  @Column(DataType.UUID)
  building_id: string;

  @Column
  name: string;

  @BelongsTo(() => Building, 'building_id')
  building: Building;
}
