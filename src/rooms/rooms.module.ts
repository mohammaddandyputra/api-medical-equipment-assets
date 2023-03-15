import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './models/room.model';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';

@Module({
  imports: [SequelizeModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
