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
import { UserRole } from 'src/common/enums';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateMedicalEquipmentDTO, UpdateMedicalEquipmentDTO } from './dto';
import { MedicalEquipmentService } from './medical_equipments.service';

@ApiTags('medical equipments')
@Controller('medical_equipments')
export class MedicalEquipmentController {
  constructor(
    private readonly medicalEquipmentService: MedicalEquipmentService,
  ) {}

  @ApiOperation({
    summary: 'Create Room',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Post()
  async create(@Body() body: CreateMedicalEquipmentDTO): Promise<ResponseDTO> {
    const data = await this.medicalEquipmentService.create(
      {
        ...body,
      },
      ['withoutTimestamp'],
    );

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'Update Room',
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
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Get()
  async getAll(@Query() query: any): Promise<ResponseDTO> {
    const { limit, offset, order } = query;

    const data = await this.medicalEquipmentService.getAll(
      {
        limit,
        offset,
        order,
      },
      [
        'withoutTimestamp',
        'withAccessories',
        'withMaintenances',
        'withComplains',
        'withRepairs',
      ],
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
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Get(':id')
  async get(@Param() param: FilterIdDTO): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.medicalEquipmentService.get(
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp', 'withRoom'],
    );

    if (!data) {
      throw new NotFoundException('Medical equipment not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
