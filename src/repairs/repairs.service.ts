import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { Repair } from './models/repair.model';

@Injectable()
export class RepairService implements IGenericService<Repair> {
  constructor(
    @InjectModel(Repair)
    private readonly repairModel: typeof Repair,
  ) {}

  async get(
    options: FindOptions<Repair>,
    scopes?: Array<string>,
  ): Promise<Repair> {
    return this.repairModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Repair>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Repair>> {
    return this.repairModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<Repair>,
    scopes?: Array<string>,
  ): Promise<Repair> {
    const data = await this.repairModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<Repair>,
    options: FindOptions<Repair>,
    scopes?: Array<string>,
  ): Promise<Repair> {
    const data = await this.repairModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
