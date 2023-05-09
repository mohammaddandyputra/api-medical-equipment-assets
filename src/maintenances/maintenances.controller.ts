import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilterIdDTO, ResponseDTO } from 'src/common/dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Condition, UserRole } from 'src/common/enums';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateMaintenanceDTO, UpdateMaintenanceDTO } from './dto';
import { MaintenanceService } from './maintenances.service';
import { MedicalEquipmentService } from 'src/medical_equipments/medical_equipments.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import moment from 'moment';

@ApiTags('maintenances')
@Controller('maintenances')
export class MaintenanceController {
  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly medicalEquipmentService: MedicalEquipmentService,
  ) {}

  @ApiOperation({
    summary: 'Create Maintenance',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Post()
  async create(
    @Body() body: CreateMaintenanceDTO,
    @CurrentUser() user: any,
  ): Promise<ResponseDTO> {
    const { medical_equipment_id, condition } = body;
    const data = await this.maintenanceService.create(
      {
        ...body,
        user_id: user.id,
        maintenance_date: new Date(moment().format()),
      },
      ['withoutTimestamp'],
    );

    if (
      condition === Condition.RUSAK_RINGAN ||
      condition === Condition.RUSAK_BERAT
    ) {
      await this.medicalEquipmentService.update(
        { condition },
        { where: { id: medical_equipment_id } },
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'Update Maintenance',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Patch(':id')
  async update(
    @Param() param: FilterIdDTO,
    @Body() body: UpdateMaintenanceDTO,
  ): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.maintenanceService.update(
      {
        ...body,
      },
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'List Maintenance',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Get()
  async getAll(@Query() query: any): Promise<ResponseDTO> {
    const { limit, offset, order } = query;

    const data = await this.maintenanceService.getAll(
      {
        limit,
        offset,
        order,
      },
      ['withoutTimestamp', 'withUser'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'Get Maintenance',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Get(':id')
  async get(@Param() param: FilterIdDTO): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.maintenanceService.get(
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp', 'withUser', 'withActions'],
    );

    if (!data) {
      throw new NotFoundException('Maintenance not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
