import { SetMetadata } from '@nestjs/common';
import { userType } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Role = (args: userType[]) => SetMetadata('roles', args);
