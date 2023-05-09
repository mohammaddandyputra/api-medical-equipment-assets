import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import * as crypto from 'crypto';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complain } from './models/complain.model';
import { ComplainService } from './complains.service';
import { ComplainController } from './complains.controller';
import { MedicalEquipmentModule } from 'src/medical_equipments/medical_equipments.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Complain]),
    MedicalEquipmentModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const target = join('uploads');
          mkdirSync(target, { recursive: true });
          cb(null, target);
        },
        filename: (_req, file, cb) => {
          const filename = `C-${Date.now()}-${crypto
            .randomBytes(16)
            .toString('hex')}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ComplainController],
  providers: [ComplainService],
  exports: [ComplainService],
})
export class ComplainModule {}
