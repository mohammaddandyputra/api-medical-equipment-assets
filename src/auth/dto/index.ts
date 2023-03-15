import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @ApiProperty({
    description: 'fullname',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  password: string;
}
