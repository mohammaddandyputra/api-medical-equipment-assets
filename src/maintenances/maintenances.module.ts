import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Maintenance } from './models/maintenance.model';
import { MaintenanceService } from './maintenances.service';
import { MaintenanceController } from './maintenances.controller';
import { MedicalEquipmentModule } from 'src/medical_equipments/medical_equipments.module';

@Module({
  imports: [SequelizeModule.forFeature([Maintenance]), MedicalEquipmentModule],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
