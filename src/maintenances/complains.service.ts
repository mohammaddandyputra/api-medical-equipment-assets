import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { Complain } from './models/complain.model';

@Injectable()
export class ComplainService implements IGenericService<Complain> {
  constructor(
    @InjectModel(Complain)
    private readonly complainModel: typeof Complain,
  ) {}

  async get(
    options: FindOptions<Complain>,
    scopes?: Array<string>,
  ): Promise<Complain> {
    return this.complainModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Complain>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Complain>> {
    return this.complainModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<Complain>,
    scopes?: Array<string>,
  ): Promise<Complain> {
    const data = await this.complainModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<Complain>,
    options: FindOptions<Complain>,
    scopes?: Array<string>,
  ): Promise<Complain> {
    const data = await this.complainModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
