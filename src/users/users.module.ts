import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
