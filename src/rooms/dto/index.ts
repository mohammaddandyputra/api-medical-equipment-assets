import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDTO {
  @ApiProperty({
    description: 'floor id',
  })
  @IsUUID()
  @IsNotEmpty()
  floor_id: string;

  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'function',
  })
  function?: string;

  @ApiPropertyOptional({
    description: 'room area',
  })
  room_area?: number;
}

export class UpdateRoomDTO {
  @ApiPropertyOptional({
    description: 'floor id',
  })
  @IsUUID()
  floor_id?: string;

  @ApiPropertyOptional({
    description: 'name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'function',
  })
  function?: string;

  @ApiPropertyOptional({
    description: 'room area',
  })
  room_area?: number;
}
