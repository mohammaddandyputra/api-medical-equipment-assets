import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRepairDTO {
  @ApiProperty({
    description: 'complain id',
  })
  @IsUUID()
  @IsNotEmpty()
  complain_id: string;

  @ApiProperty({
    description: 'user id',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'repair date',
  })
  @IsNotEmpty()
  repair_date: Date;

  @ApiProperty({
    description: 'condition',
  })
  @IsNotEmpty()
  condition: string;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}

export class UpdateRepairDTO {
  @ApiPropertyOptional({
    description: 'complain id',
  })
  @IsUUID()
  complain_id: string;

  @ApiPropertyOptional({
    description: 'user id',
  })
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({
    description: 'repair date',
  })
  repair_date: Date;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition: string;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}
