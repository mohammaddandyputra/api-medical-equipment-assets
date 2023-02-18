import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  name: string;
}

export class UpdateRoleDTO {
  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
