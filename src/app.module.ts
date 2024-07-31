import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PartnerModule } from './partner/partner.module';
import { EventModule } from './event/event.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [AuthModule, PrismaModule, PartnerModule, EventModule, TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
