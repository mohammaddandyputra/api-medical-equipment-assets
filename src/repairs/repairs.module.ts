import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Repair } from './models/repair.model';
import { RepairService } from './repairs.service';
import { RepairController } from './repairs.controller';

@Module({
  imports: [SequelizeModule.forFeature([Repair])],
  controllers: [RepairController],
  providers: [RepairService],
  exports: [RepairService],
})
export class RepairModule {}
