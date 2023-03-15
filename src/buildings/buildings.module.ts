import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Building } from './models/building.model';
import { BuildingFloor } from './models/building_floor.model';
import { BuildingController } from './buildings.controller';
import { BuildingService } from './buildings.service';

@Module({
  imports: [SequelizeModule.forFeature([Building, BuildingFloor])],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingsModule {}
