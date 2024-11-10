import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipesRepository: Repository<RecipeEntity>,

    @Inject(forwardRef(() => ReviewsService))
    private reviewsService: ReviewsService
  ) { }

  async create(createRecipe: CreateRecipeDto, userId: number): Promise<RecipeEntity> {
    const totalTime = createRecipe.preparationTime + createRecipe.cookingTime;
    const newRecipe = this.recipesRepository.create({
      ...createRecipe,
      totalTime,
      userId,
    });
    return this.recipesRepository.save(newRecipe);
  }

  async findAll(): Promise<RecipeEntity[]> {
    return this.recipesRepository.find();
  }

  async findOne(id: number): Promise<RecipeEntity & { totalReviews: number, averageAvaliation: number }> {
    const recipe = await this.findRecipeOrThrow(id);

    recipe.views += 1;
    await this.recipesRepository.save(recipe);

    const { totalReviews, averageAvaliation } = await this.reviewsService.findRecipeAvaliationInfo(id);

    return {
      ...recipe,
      totalReviews,
      averageAvaliation,
    };
  }

  async findRecipesByName(name: string): Promise<RecipeEntity[]> {
    return this.recipesRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async update(id: number, updateRecipeDto: CreateRecipeDto): Promise<{ message: string }> {
    await this.findRecipeOrThrow(id);

    const totalTime = updateRecipeDto.preparationTime + updateRecipeDto.cookingTime;
    await this.recipesRepository.update(id, {
      ...updateRecipeDto,
      totalTime,
    });

    return { message: `Recipe updated successfully` };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findRecipeOrThrow(id);

    await this.recipesRepository.delete(id);

    return { message: `Recipe deleted successfully` };
  }

  async findRecipesByUser(userId: number): Promise<RecipeEntity[]> {
    return this.recipesRepository.findBy({ userId });
  }


  // Funções de validação
  async findRecipeOrThrow(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipesRepository.findOneBy({ id });
    if (!recipe) throw new NotFoundException(`Recipe with id ${id} not found`);
    return recipe;
  }
}
