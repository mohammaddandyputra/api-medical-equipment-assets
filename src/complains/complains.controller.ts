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
import { ComplainStatus, UserRole } from 'src/common/enums';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateComplainDTO, UpdateComplainDTO } from './dto';
import { ComplainService } from './complains.service';
import { MedicalEquipmentService } from 'src/medical_equipments/medical_equipments.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as moment from 'moment';
import { Utils } from 'src/common/utils';

@ApiTags('complains')
@Controller('complains')
export class ComplainController {
  constructor(
    private readonly complainService: ComplainService,
    private readonly medicalEquipmentService: MedicalEquipmentService,
  ) {}
  private util = new Utils();

  @ApiOperation({
    summary: 'Create Complain',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Post()
  async create(
    @Body() body: CreateComplainDTO,
    @CurrentUser() user: any,
  ): Promise<ResponseDTO> {
    const { condition, medical_equipment_id } = body;
    const complain = await this.complainService.get({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    const data = await this.complainService.create(
      {
        ...body,
        unique_key: this.util.codeGenerator(complain.unique_key),
        user_id: user.id,
        complain_date: new Date(moment().format()),
        status: ComplainStatus.PENDING,
      },
      ['withoutTimestamp'],
    );

    await this.medicalEquipmentService.update(
      { condition },
      { where: { id: medical_equipment_id } },
    );

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'Update Complain',
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
    @Body() body: UpdateComplainDTO,
  ): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.complainService.update(
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
    summary: 'List Complain',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.USER))
  @Get()
  async getAll(@Query() query: any): Promise<ResponseDTO> {
    const { limit, offset, order } = query;

    const data = await this.complainService.getAll(
      {
        limit,
        offset,
        order,
      },
      ['withoutTimestamp', 'withUser', 'withMedicalEquipment'],
    );

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiOperation({
    summary: 'Get Complain',
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

    const data = await this.complainService.get(
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp', 'withMedicalEquipment', 'withUser', 'withRepair'],
    );

    if (!data) {
      throw new NotFoundException('Complain not found!');
    }

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
