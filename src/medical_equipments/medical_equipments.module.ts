import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalEquipment } from './models/medical_equipment.model';
import { MedicalEquipmentAccessories } from './models/medical_equipment_accessories.model';
import { MedicalEquipmentService } from './medical_equipments.service';
import { MedicalEquipmentController } from './medical_equipments.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([MedicalEquipment, MedicalEquipmentAccessories]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('upload');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `medical-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [MedicalEquipmentController],
  providers: [MedicalEquipmentService],
  exports: [MedicalEquipmentService],
})
export class MedicalEquipmentModule {}
