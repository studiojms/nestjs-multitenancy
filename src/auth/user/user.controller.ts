import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPresenter } from './user.presenter';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createCommonUser(data);

    //toJson is called implicitly by NestJS
    return new UserPresenter(user);
  }
}
