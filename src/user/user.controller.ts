import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() data: UserDto) {
    return this.userService.signup(data);
  }

  @Post('login')
  login(@Body() data: UserDto) {
    return this.userService.login(data);
  }
}
