import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class FilterIdDTO {
  @ApiProperty({
    description: 'id',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class PaginationDTO {
  @ApiPropertyOptional({
    description: 'sort by',
  })
  @IsOptional()
  @IsNotEmpty()
  sort_by?: string;

  @ApiPropertyOptional({
    description: 'order by',
  })
  @IsOptional()
  @IsNotEmpty()
  order_by?: string;

  @ApiPropertyOptional({
    description: 'limit',
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    description: 'offset',
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  offset?: number;
}

export class FilterDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'keyword for search',
  })
  keyword?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Filter ex: name:test',
  })
  @IsOptional()
  filter?: string;
}

export class ResponseDTO {
  statusCode: number;
  data?: any;
  message?: string[] | string;
  error?: string;
}
