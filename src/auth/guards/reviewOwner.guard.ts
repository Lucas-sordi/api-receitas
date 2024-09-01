import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reviewId = request.params.id;
    
    if (!user || !reviewId) {
      throw new UnauthorizedException();
    }

    const review = await this.reviewsService.findOne(reviewId);

    if (!review || review.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
