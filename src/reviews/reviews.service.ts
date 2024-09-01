import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { RecipeAvaliationInfoDto } from './dto/recipeAvaliationInfo.dto';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,

    @Inject(forwardRef(() => RecipesService))
    private recipesService: RecipesService,
  ) {}
  
  async create(createReview: CreateReviewDto, userId: number): Promise<ReviewEntity> {
    await this.recipesService.findRecipeOrThrow(createReview.recipeId);

    // Tenta encontrar uma revisão existente para o usuário e a receita especificada
    const existingReview = await this.reviewsRepository.findOne({
      where: {
        recipeId: createReview.recipeId,
        userId: userId,
      },
    });

    if (existingReview) {
      // Se a revisão já existir, atualize os dados existentes
      this.reviewsRepository.merge(existingReview, createReview);
      return this.reviewsRepository.save(existingReview);
    } else {
          // Se a revisão não existir, crie uma nova
      const newReview = this.reviewsRepository.create({
        ...createReview,
        userId,
      });
      return this.reviewsRepository.save(newReview);
    }
  }

  async findOne(id: number): Promise<ReviewEntity> {
    return await this.findReviewOrThrow(id);
  }

  async findAllReviewsOfARecipe(recipeId: number): Promise<ReviewEntity[]> {
    await this.recipesService.findRecipeOrThrow(recipeId);

    return this.reviewsRepository.findBy({ recipeId });
  }
  
  async findRecipeAvaliationInfo(recipeId: number): Promise<RecipeAvaliationInfoDto> {
    const [reviews, total] = await this.reviewsRepository.findAndCount({
      where: { recipeId },
    });

    const averageAvaliation = total > 0 ? reviews.reduce((acc, review) => acc + review.avaliation, 0) / total : 0;

    return {
      totalReviews: total,
      averageAvaliation: parseFloat(averageAvaliation.toFixed(2)),
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findReviewOrThrow(id);

    await this.reviewsRepository.delete(id);

    return { message: `Review deleted successfully`};
  }


  // Funções de validação
  private async findReviewOrThrow(id: number): Promise<ReviewEntity> {
    const review = await this.reviewsRepository.findOneBy({ id });
    if (!review) throw new NotFoundException(`Review with id ${id} not found`);
    return review;
  }
}
