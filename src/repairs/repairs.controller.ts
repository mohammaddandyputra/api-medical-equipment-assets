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
import { CreateRepairDTO, UpdateRepairDTO } from './dto';
import { RepairService } from './repairs.service';
import * as moment from 'moment';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ComplainService } from 'src/complains/complains.service';

@ApiTags('repairs')
@Controller('repairs')
export class RepairController {
  constructor(
    private readonly repairService: RepairService,
    private readonly complainService: ComplainService,
  ) {}

  @ApiOperation({
    summary: 'Create Repair',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Post()
  async create(
    @Body() body: CreateRepairDTO,
    @CurrentUser() user: any,
  ): Promise<ResponseDTO> {
    const { complain_id } = body;
    const complain = await this.complainService.get({
      where: { id: complain_id },
    });

    const data = await this.repairService.create(
      {
        ...body,
        medical_equipment_id: complain.medical_equipment_id,
        user_id: user.id,
        repair_date: new Date(moment().format()),
      },
      ['withoutTimestamp'],
    );

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @ApiOperation({
    summary: 'Update Repair',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Patch(':id')
  async update(
    @Param() param: FilterIdDTO,
    @Body() body: UpdateRepairDTO,
  ): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.repairService.update(
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
    summary: 'List Repair',
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

    const data = await this.repairService.getAll(
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
    summary: 'Get Repair',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'The request was invalid' })
  @ApiNotFoundResponse({ description: 'The request was not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN, UserRole.TECHNICIAN))
  @Get(':id')
  async get(@Param() param: FilterIdDTO): Promise<ResponseDTO> {
    const { id } = param;

    const data = await this.repairService.get(
      {
        where: {
          id,
        },
      },
      ['withoutTimestamp'],
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
