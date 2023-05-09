import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Max } from 'class-validator';

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
  @Max(4)
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

  @ApiPropertyOptional({
    description: 'image path',
  })
  image?: string;
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
  @Max(4)
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

  @ApiPropertyOptional({
    description: 'image path',
  })
  image?: string;
}
