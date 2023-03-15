import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMaintenanceDTO {
  @ApiProperty({
    description: 'medical equipment id',
  })
  @IsUUID()
  @IsNotEmpty()
  medical_equipment: string;

  @ApiProperty({
    description: 'user id',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'maintenance date',
  })
  @IsNotEmpty()
  maintenance_date: Date;

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
}

export class UpdateMaintenanceDTO {
  @ApiPropertyOptional({
    description: 'medical equipment id',
  })
  @IsUUID()
  medical_equipment: string;

  @ApiPropertyOptional({
    description: 'user id',
  })
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({
    description: 'maintenance date',
  })
  maintenance_date: Date;

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
}
