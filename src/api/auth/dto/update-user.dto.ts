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
  phone?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  @Min(6)
  password: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatar?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatarPath?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  avatarMedia_id?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  profession?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  about?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsosInstagram?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsosFacebook?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsosLinkedin?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined && value !== null)
  medsosWhatsapp?: string;
}
