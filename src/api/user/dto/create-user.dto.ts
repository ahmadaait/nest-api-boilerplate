import { $Enums, Prisma } from '@prisma/client';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  name: string;

  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  email: string;
}
