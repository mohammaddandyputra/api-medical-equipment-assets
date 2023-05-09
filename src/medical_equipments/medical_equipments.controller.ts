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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { UserRole } from 'src/common/enums';
import { RoleGuard } from '../common/guards/role.guard';
import {
  CreateMedicalEquipmentDTO,
  FilterRoomIdDTO,
  UpdateMedicalEquipmentDTO,
} from './dto';
import { MedicalEquipmentService } from './medical_equipments.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/users/users.service';

@ApiTags('medical equipments')
@Controller('medical_equipments')
export class MedicalEquipmentController {
  constructor(
    private readonly medicalEquipmentService: MedicalEquipmentService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'Create Medical Equipment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(
    JwtAuthGuard,
    RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.USER),
  )
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  async create(
    @Body() body: CreateMedicalEquipmentDTO,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
    },
  ): Promise<ResponseDTO> {
    const data = await this.medicalEquipmentService.create(
      {
        ...body,
        image_path: files.image?.[0]?.path,
      },
      ['withoutTimestamp'],
    );

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'Update Medical Equipment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(
    JwtAuthGuard,
    RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.USER),
  )
  @Patch(':id')
  async update(
    @Param() param: FilterIdDTO,
    @Body() body: UpdateMedicalEquipmentDTO,
  ): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.medicalEquipmentService.update(
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
    summary: 'List Medical Equipment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(
    JwtAuthGuard,
    RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.TECHNICIAN),
  )
  @Get()
  async getAll(@Query() query: any): Promise<ResponseDTO> {
    const { limit, offset, order } = query;

    const data = await this.medicalEquipmentService.getAll(
      {
        limit,
        offset,
        order,
      },
      ['withoutTimestamp', 'withRoom'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'Get Medical Equipment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(
    JwtAuthGuard,
    RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.USER),
  )
  @Get(':id')
  async get(@Param() param: FilterIdDTO): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.medicalEquipmentService.get(
      {
        where: {
          id,
        },
        order: [
          ['accessories', 'name', 'ASC'],
          ['maintenances', 'maintenance_date', 'DESC'],
          ['complains', 'complain_date', 'DESC'],
          ['repairs', 'repair_date', 'DESC'],
        ],
      },
      [
        'withoutTimestamp',
        'withRoom',
        'withAccessories',
        'withMaintenances',
        'withComplains',
        'withRepairs',
      ],
    );

    if (!data) {
      throw new NotFoundException('Medical equipment not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'Get All Medical Equipment By Room',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(
    JwtAuthGuard,
    RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.USER),
  )
  @Get('room/:room_id')
  async getByRoom(@Param() param: FilterRoomIdDTO): Promise<ResponseDTO> {
    const { room_id } = param;

    const data = await this.medicalEquipmentService.getAll({
      where: {
        room_id,
      },
    });

    if (!data) {
      throw new NotFoundException('Medical equipment not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
