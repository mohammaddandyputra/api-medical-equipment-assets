import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { Maintenance } from './models/maintenance.model';
import { MaintenanceService } from './maintenances.service';
import { MaintenanceController } from './maintenances.controller';
import { MedicalEquipmentModule } from 'src/medical_equipments/medical_equipments.module';
import { MaintenanceAction } from './models/maintenance_actions.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Maintenance, MaintenanceAction]),
    MedicalEquipmentModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('uploads');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `M-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
