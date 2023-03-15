import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'fullname',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'fullname',
  })
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({
    description: 'email',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'password',
  })
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: 'role',
  })
  @IsUUID()
  @IsOptional()
  role_id?: number;
}
