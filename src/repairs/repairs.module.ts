import { Module } from '@nestjs/common';
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
  ],
  controllers: [RepairController],
  providers: [RepairService],
  exports: [RepairService],
})
export class RepairModule {}
