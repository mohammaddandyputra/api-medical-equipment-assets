import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalEquipment } from './models/medical_equipment.model';
import { MedicalEquipmentAccessories } from 'src/medical_equipment_accessories/models/medical_equipment_accessories.model';
import { MedicalEquipmentService } from './medical_equipments.service';
import { MedicalEquipmentController } from './medical_equipments.controller';
import { Maintenance } from 'src/maintenances/models/maintenance.model';
import { Complain } from 'src/complains/models/complain.model';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MedicalEquipment,
      MedicalEquipmentAccessories,
      Maintenance,
      Complain,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('uploads');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `ME-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
    UserModule,
  ],
  controllers: [MedicalEquipmentController],
  providers: [MedicalEquipmentService],
  exports: [MedicalEquipmentService],
})
export class MedicalEquipmentModule {}
