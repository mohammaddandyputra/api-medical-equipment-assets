import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { BuildingFloor } from './building_floor.model';

@Scopes(() => ({
  withoutTimestamp: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
  withFloor: {
    include: {
      model: BuildingFloor,
      as: 'floors',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    },
  },
}))
@Table({
  tableName: 'buildings',
  underscored: true,
  paranoid: true,
})
export class Building extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

  @Column
  procurement_date: Date;

  @Column
  operating_year: string;

  @Column
  building_area: number;

  @Column
  purchase_price: number;

  @Column
  source_of_funds: string;

  @Column
  image_path: string;

  @HasMany(() => BuildingFloor, 'building_id')
  floors: BuildingFloor[];
}
