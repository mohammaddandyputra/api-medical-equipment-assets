import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { Maintenance } from './models/maintenance.model';

@Injectable()
export class MaintenanceService implements IGenericService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    private readonly maintenanceModel: typeof Maintenance,
  ) {}

  async get(
    options: FindOptions<Maintenance>,
    scopes?: Array<string>,
  ): Promise<Maintenance> {
    return this.maintenanceModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Maintenance>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Maintenance>> {
    return this.maintenanceModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<Maintenance>,
    scopes?: Array<string>,
  ): Promise<Maintenance> {
    const data = await this.maintenanceModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<Maintenance>,
    options: FindOptions<Maintenance>,
    scopes?: Array<string>,
  ): Promise<Maintenance> {
    const data = await this.maintenanceModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
