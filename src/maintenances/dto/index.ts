import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateComplainDTO {
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
    description: 'complain date',
  })
  @IsNotEmpty()
  complain_date: Date;

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
  medical_equipment?: string;

  @ApiPropertyOptional({
    description: 'user id',
  })
  @IsUUID()
  user_id?: string;

  @ApiPropertyOptional({
    description: 'complain date',
  })
  complain_date?: Date;

  @ApiPropertyOptional({
    description: 'priority',
  })
  priority?: boolean;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}
