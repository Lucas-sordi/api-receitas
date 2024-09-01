import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { GetUserId } from 'src/utils/decorators/getUserId.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ReviewOwnerGuard } from 'src/auth/guards/reviewOwner.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createReviewDto: CreateReviewDto, @GetUserId() userId: number) {
    return this.reviewsService.create(createReviewDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Get('/findReviewsOfRecipe/:recipeId')
  findAllReviewsOfARecipe(@Param('recipeId') recipeId: string) {
    return this.reviewsService.findAllReviewsOfARecipe(+recipeId);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, ReviewOwnerGuard)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
