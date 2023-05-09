import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalEquipmentAccessories } from './models/medical_equipment_accessories.model';
import { MedicalEquipmentAccessoriesService } from './medical_equipment_accessories.service';
import { MedicalEquipmentAccessoriesController } from './medical_equipment_accessories.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MedicalEquipmentAccessories]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('uploads');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `MEA-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [MedicalEquipmentAccessoriesController],
  providers: [MedicalEquipmentAccessoriesService],
  exports: [MedicalEquipmentAccessoriesService],
})
export class MedicalEquipmentAccessoriesModule {}
