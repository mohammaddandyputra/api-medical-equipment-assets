import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateComplainDTO {
  @ApiProperty({
    description: 'medical equipment id',
  })
  @IsUUID()
  @IsNotEmpty()
  medical_equipment_id: string;

  @ApiProperty({
    description: 'priority',
  })
  @IsNotEmpty()
  priority: boolean;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}

export class UpdateComplainDTO {
  @ApiPropertyOptional({
    description: 'medical equipment id',
  })
  @IsUUID()
  medical_equipment_id?: string;

  @ApiPropertyOptional({
    description: 'priority',
  })
  priority?: boolean;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}
