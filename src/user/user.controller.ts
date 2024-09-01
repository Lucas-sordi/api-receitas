import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUserId } from 'src/utils/decorators/getUserId.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/reviews')
  @UseGuards(JwtGuard)
  getUserReviews(@GetUserId() userId: string) {
    return this.usersService.findReviewsByUser(+userId);
  }

  @Get('/recipes')
  @UseGuards(JwtGuard)
  getUserRecipes(@GetUserId() userId: string) {
    return this.usersService.findRecipesByUser(+userId);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  getUserProfile(@GetUserId() userId: string) {
    return this.usersService.findById(+userId);
  }
}
