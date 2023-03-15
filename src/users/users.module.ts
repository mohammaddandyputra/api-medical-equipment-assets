import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { RoleModule } from 'src/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
