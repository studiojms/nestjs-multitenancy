import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../user/user-roles';

export const Role = (...args: UserRoles[]) => SetMetadata('role', args);
