import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { Role } from './interface/role';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  signupUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Get('me')
  // @UseGuards(AuthGuard)
  @UseGuards(AuthGuard, RoleGuard)
  // @UseGuards(RoleGuard)
  // @Roles(Role.Admin)
  @Roles(Role.Admin, Role.Student)
  userInfo(@Req() { user }): Promise<UserEntity | null> {
    return this.userService.findOne(user.username);
  }
}
