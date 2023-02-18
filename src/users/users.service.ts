import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { User } from './models/user.model';

@Injectable()
export class UsersService implements IGenericService<User> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async get(options: FindOptions<User>, scopes?: Array<string>): Promise<User> {
    return this.userModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<User>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<User>> {
    return this.userModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(values: Partial<User>, scopes?: Array<string>): Promise<User> {
    const data = await this.userModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<User>,
    options: FindOptions<User>,
    scopes?: Array<string>,
  ): Promise<User> {
    const data = await this.userModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
