import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}
