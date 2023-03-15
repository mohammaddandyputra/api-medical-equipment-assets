import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBuildingDTO {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'procurement date',
  })
  procurement_date?: Date;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  operating_year?: string;

  @ApiPropertyOptional({
    description: 'building area',
  })
  building_area?: number;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  purchase_price?: number;

  @ApiPropertyOptional({
    description: 'source of funds',
  })
  source_of_funds?: string;
}

export class UpdateBuildingDTO {
  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'procurement date',
  })
  procurement_date?: Date;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  operating_year?: string;

  @ApiPropertyOptional({
    description: 'building area',
  })
  building_area?: number;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  purchase_price?: number;

  @ApiPropertyOptional({
    description: 'source of funds',
  })
  source_of_funds?: string;
}
