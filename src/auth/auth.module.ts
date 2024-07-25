import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PartnerUserController } from './partner-user/partner-user.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController, PartnerUserController, AuthController],
  providers: [UserService, AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
})
export class AuthModule {}
