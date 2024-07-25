import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }

  extractToken(request: Request) {
    const header = request.headers['authorization'];
    const [type, token] = header ? header.split(' ') : [,];

    return type === 'Bearer' ? token : null;
  }
}
