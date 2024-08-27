import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post('/register')
  async register(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser);
  };

  @Post('/login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  };
};
