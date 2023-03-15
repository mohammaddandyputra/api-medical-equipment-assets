import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { Building } from './models/building.model';

@Injectable()
export class BuildingService implements IGenericService<Building> {
  constructor(
    @InjectModel(Building)
    private readonly buildingModel: typeof Building,
  ) {}

  async get(
    options: FindOptions<Building>,
    scopes?: Array<string>,
  ): Promise<Building> {
    return this.buildingModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Building>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Building>> {
    return this.buildingModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<Building>,
    scopes?: Array<string>,
  ): Promise<Building> {
    const data = await this.buildingModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<Building>,
    options: FindOptions<Building>,
    scopes?: Array<string>,
  ): Promise<Building> {
    const data = await this.buildingModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
