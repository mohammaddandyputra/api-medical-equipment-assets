import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { Room } from './models/room.model';

@Injectable()
export class RoomService implements IGenericService<Room> {
  constructor(
    @InjectModel(Room)
    private readonly roomModel: typeof Room,
  ) {}

  async get(options: FindOptions<Room>, scopes?: Array<string>): Promise<Room> {
    return this.roomModel.scope(scopes ?? 'defaultScope').findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<Room>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<Room>> {
    return this.roomModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(values: Partial<Room>, scopes?: Array<string>): Promise<Room> {
    const data = await this.roomModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<Room>,
    options: FindOptions<Room>,
    scopes?: Array<string>,
  ): Promise<Room> {
    const data = await this.roomModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
