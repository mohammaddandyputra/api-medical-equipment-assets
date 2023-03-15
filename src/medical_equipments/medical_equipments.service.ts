import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { MedicalEquipment } from './models/medical_equipment.model';

@Injectable()
export class MedicalEquipmentService
  implements IGenericService<MedicalEquipment>
{
  constructor(
    @InjectModel(MedicalEquipment)
    private readonly medicalEquipmentModel: typeof MedicalEquipment,
  ) {}

  async get(
    options: FindOptions<MedicalEquipment>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipment> {
    return this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<MedicalEquipment>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<MedicalEquipment>> {
    return this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<MedicalEquipment>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipment> {
    const data = await this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<MedicalEquipment>,
    options: FindOptions<MedicalEquipment>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipment> {
    const data = await this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
