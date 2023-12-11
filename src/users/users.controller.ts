import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Post, Body, Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { Serialize } from './interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password, body.admin);
    session.userId = user.id;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/currentUser')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('/')
  getAllUsers() {
    return this.userService.findAll();
  }

  
}
