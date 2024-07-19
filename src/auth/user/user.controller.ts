import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserPresenter } from './user.presenter';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);

    //toJson is called implicitly by NestJS
    return new UserPresenter(user);
  }
}
