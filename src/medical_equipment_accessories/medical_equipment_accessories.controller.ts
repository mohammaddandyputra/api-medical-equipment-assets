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
  CreateMedicalEquipmentAccessoriesDTO,
  UpdateMedicalEquipmentAccessoriesDTO,
} from './dto';
import { MedicalEquipmentAccessoriesService } from './medical_equipment_accessories.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('medical equipment accessories')
@Controller('medical_equipment_accessories')
export class MedicalEquipmentAccessoriesController {
  constructor(
    private readonly medicalEquipmentAccessoriesService: MedicalEquipmentAccessoriesService,
  ) {}

  @ApiOperation({
    summary: 'Create Medical Equipment Accessories',
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
    @Body() body: CreateMedicalEquipmentAccessoriesDTO,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
    },
  ): Promise<ResponseDTO> {
    const data = await this.medicalEquipmentAccessoriesService.create(
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
    summary: 'Update Medical Equipment Accessories',
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
    @Body() body: UpdateMedicalEquipmentAccessoriesDTO,
  ): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.medicalEquipmentAccessoriesService.update(
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
    summary: 'List Medical Equipment Accessories',
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

    const data = await this.medicalEquipmentAccessoriesService.getAll(
      {
        limit,
        offset,
        order,
      },
      ['withoutTimestamp'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'Get Medical Equipment Accessories',
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

    const data = await this.medicalEquipmentAccessoriesService.get(
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp'],
    );

    if (!data) {
      throw new NotFoundException('Medical equipment accessories not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
