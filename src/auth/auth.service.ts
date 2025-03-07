import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthSignInDto } from './interface/auth-signin.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: AuthSignInDto) {
    const user = (await this.userService.findOne(email))!;

    // if (!compare(password, user.passwordHash)) {
    //   throw new UnauthorizedException();
    // }

    const isAuthorized = await compare(password, user.passwordHash);

    if (!isAuthorized) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
