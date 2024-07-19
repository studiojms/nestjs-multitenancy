import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaservice: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prismaservice.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER],
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
