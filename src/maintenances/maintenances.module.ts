import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Maintenance } from './models/maintenance.model';
import { MaintenanceService } from './maintenances.service';
import { MaintenanceController } from './maintenances.controller';

@Module({
  imports: [SequelizeModule.forFeature([Maintenance])],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
