import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMaintenanceDTO {
  @ApiProperty({
    description: 'medical equipment id',
  })
  @IsUUID()
  @IsNotEmpty()
  medical_equipment_id: string;

  @ApiPropertyOptional({
    description: 'temperature',
  })
  temperature?: string;

  @ApiPropertyOptional({
    description: 'humidity',
  })
  humidity?: string;

  @ApiPropertyOptional({
    description: 'electricity',
  })
  electricity?: boolean;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition?: string;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;

  @ApiPropertyOptional({
    description: 'image path',
  })
  image?: string;
}

export class UpdateMaintenanceDTO {
  @ApiPropertyOptional({
    description: 'medical equipment id',
  })
  @IsUUID()
  medical_equipment_id: string;

  @ApiPropertyOptional({
    description: 'temperature',
  })
  temperature?: string;

  @ApiPropertyOptional({
    description: 'humidity',
  })
  humidity?: string;

  @ApiPropertyOptional({
    description: 'electricity',
  })
  electricity?: boolean;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition?: string;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;

  @ApiPropertyOptional({
    description: 'image path',
  })
  image?: string;
}
