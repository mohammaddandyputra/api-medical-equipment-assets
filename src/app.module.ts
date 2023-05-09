import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/models/roles.model';
import { RoleModule } from './roles/roles.module';
import { User } from './users/models/user.model';
import { UserModule } from './users/users.module';
import { Building } from './buildings/models/building.model';
import { BuildingFloor } from './buildings/models/building_floor.model';
import { BuildingsModule } from './buildings/buildings.module';
import { Room } from './rooms/models/room.model';
import { RoomModule } from './rooms/rooms.module';
import { MedicalEquipment } from './medical_equipments/models/medical_equipment.model';
import { MedicalEquipmentAccessories } from './medical_equipment_accessories/models/medical_equipment_accessories.model';
import { MedicalEquipmentAccessoriesModule } from './medical_equipment_accessories/medical_equipment_accessories.module';
import { MedicalEquipmentModule } from './medical_equipments/medical_equipments.module';
import { Complain } from './complains/models/complain.model';
import { ComplainModule } from './complains/complains.module';
import { Repair } from './repairs/models/repair.model';
import { RepairAction } from './repairs/models/repair_action.model';
import { RepairModule } from './repairs/repairs.module';
import { Maintenance } from './maintenances/models/maintenance.model';
import { MaintenanceAction } from './maintenances/models/maintenance_actions.model';
import { MaintenanceModule } from './maintenances/maintenances.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get('DATABASE_DIALECT'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true,
        models: [
          Role,
          User,
          Building,
          BuildingFloor,
          Room,
          MedicalEquipment,
          MedicalEquipmentAccessories,
          Complain,
          Repair,
          RepairAction,
          Maintenance,
          MaintenanceAction,
        ],
      }),
      inject: [ConfigService],
    }),
    RoleModule,
    AuthModule,
    UserModule,
    BuildingsModule,
    RoomModule,
    MedicalEquipmentAccessoriesModule,
    MedicalEquipmentModule,
    ComplainModule,
    RepairModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
