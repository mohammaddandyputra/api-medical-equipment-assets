import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, FindAndCountOptions } from 'sequelize/types';
import { IGenericService } from 'src/common/interfaces';
import { PaginationResult } from 'src/common/types';
import { MedicalEquipmentAccessories } from './models/medical_equipment_accessories.model';

@Injectable()
export class MedicalEquipmentAccessoriesService
  implements IGenericService<MedicalEquipmentAccessories>
{
  constructor(
    @InjectModel(MedicalEquipmentAccessories)
    private readonly medicalEquipmentModel: typeof MedicalEquipmentAccessories,
  ) {}

  async get(
    options: FindOptions<MedicalEquipmentAccessories>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipmentAccessories> {
    return this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);
  }

  async getAll(
    options: FindAndCountOptions<MedicalEquipmentAccessories>,
    scopes?: Array<string>,
  ): Promise<PaginationResult<MedicalEquipmentAccessories>> {
    return this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findAndCountAll(options);
  }

  async create(
    values: Partial<MedicalEquipmentAccessories>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipmentAccessories> {
    const data = await this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .build(values)
      .save();

    return data.reload();
  }

  async update(
    values: Partial<MedicalEquipmentAccessories>,
    options: FindOptions<MedicalEquipmentAccessories>,
    scopes?: Array<string>,
  ): Promise<MedicalEquipmentAccessories> {
    const data = await this.medicalEquipmentModel
      .scope(scopes ?? 'defaultScope')
      .findOne(options);

    return data.update(values);
  }
}
