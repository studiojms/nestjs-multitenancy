import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TenantInterceptor } from 'src/tenant/tenant.interceptor';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Role } from 'src/auth/role/role.decorator';
import { UserRoles } from 'src/auth/user/user-roles';

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Role(UserRoles.PARTNER)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Role(UserRoles.PARTNER)
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
