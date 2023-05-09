import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { Repair } from './models/repair.model';
import { RepairService } from './repairs.service';
import { RepairController } from './repairs.controller';
import { RepairAction } from './models/repair_action.model';
import { MedicalEquipmentModule } from 'src/medical_equipments/medical_equipments.module';
import { ComplainModule } from 'src/complains/complains.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Repair, RepairAction]),
    MedicalEquipmentModule,
    ComplainModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('uploads');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `R-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [RepairController],
  providers: [RepairService],
  exports: [RepairService],
})
export class RepairModule {}
