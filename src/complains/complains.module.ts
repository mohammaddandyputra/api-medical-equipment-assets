import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complain } from './models/complain.model';
import { ComplainService } from './complains.service';
import { ComplainController } from './complains.controller';

@Module({
  imports: [SequelizeModule.forFeature([Complain])],
  controllers: [ComplainController],
  providers: [ComplainService],
  exports: [ComplainService],
})
export class ComplainModule {}
