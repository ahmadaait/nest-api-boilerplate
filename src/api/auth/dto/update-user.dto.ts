import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  name: string;

  @IsEmail()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  email: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  @Min(6)
  password: string;
}
