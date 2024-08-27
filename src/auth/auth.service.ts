import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {};

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    };

    return false;
  };

  async login(login: any) {
    const user = await this.validateUser(login.username, login.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    };

    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id })
    };
  };

  async register(createUser: CreateUserDto) {
    return this.userService.create(createUser);
  };
};
