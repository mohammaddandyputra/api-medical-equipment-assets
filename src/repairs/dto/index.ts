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
  complain_id?: string;

  @ApiPropertyOptional({
    description: 'condition',
  })
  condition?: string;

  @ApiPropertyOptional({
    description: 'note',
  })
  note?: string;
}
