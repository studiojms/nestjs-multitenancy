import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaservice: PrismaService) {}

  createCommonUser(data: CreateUserDto) {
    return this.prismaservice.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER],
      },
    });
  }

  createPartnerUser(data: CreateUserDto) {
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

  findByEmail(email: string) {
    return this.prismaservice.user.findFirst({
      where: {
        email,
      },
    });
  }
}
