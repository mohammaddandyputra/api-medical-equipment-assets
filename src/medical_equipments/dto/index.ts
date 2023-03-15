import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMedicalEquipmentDTO {
  @ApiProperty({
    description: 'room id',
  })
  @IsUUID()
  @IsNotEmpty()
  room_id: string;

  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'merk',
  })
  merk?: string;

  @ApiPropertyOptional({
    description: 'type',
  })
  type?: string;

  @ApiProperty({
    description: 'serial number',
  })
  @IsNotEmpty()
  sn: string;

  @ApiPropertyOptional({
    description: 'purchase price',
  })
  purchase_price?: number;

  @ApiPropertyOptional({
    description: 'source of funds',
  })
  source_of_funds?: string;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition?: string;

  @ApiPropertyOptional({
    description: 'ownership type',
  })
  ownership_type?: string;

  @ApiPropertyOptional({
    description: 'procurement date',
  })
  procurement_date?: Date;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  operating_year?: Date;
}

export class UpdateMedicalEquipmentDTO {
  @ApiPropertyOptional({
    description: 'room id',
  })
  @IsUUID()
  room_id?: string;

  @ApiPropertyOptional({
    description: 'name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'merk',
  })
  merk?: string;

  @ApiPropertyOptional({
    description: 'type',
  })
  type?: string;

  @ApiProperty({
    description: 'serial number',
  })
  @IsNotEmpty()
  sn: string;

  @ApiPropertyOptional({
    description: 'purchase price',
  })
  purchase_price?: number;

  @ApiPropertyOptional({
    description: 'source of funds',
  })
  source_of_funds?: string;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition?: string;

  @ApiPropertyOptional({
    description: 'ownership type',
  })
  ownership_type?: string;

  @ApiPropertyOptional({
    description: 'procurement date',
  })
  procurement_date?: Date;

  @ApiPropertyOptional({
    description: 'operating year',
  })
  operating_year?: Date;
}
