import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserPresenter } from '../user/user.presenter';

@Controller('partner/user')
export class PartnerUserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createPartnerUser(data);

    //toJson is called implicitly by NestJS
    return new UserPresenter(user);
  }
}
