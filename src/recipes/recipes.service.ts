import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipesRepository: Repository<RecipeEntity>,
  ) {}

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

  async findOne(id: number): Promise<RecipeEntity> {
    const recipe = await this.findRecipeOrThrow(id);
  
    recipe.views += 1;
    await this.recipesRepository.save(recipe);
    
    return recipe;  }

  async update(id: number, updateRecipeDto: CreateRecipeDto): Promise<{ message: string }> {
    await this.findRecipeOrThrow(id);

    const totalTime = updateRecipeDto.preparationTime + updateRecipeDto.cookingTime;
    await this.recipesRepository.update(id, {
      ...updateRecipeDto,
      totalTime,
    });

    return { message: `Recipe updated successfully`};
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findRecipeOrThrow(id);

    await this.recipesRepository.delete(id);

    return { message: `Recipe deleted successfully`};
  }

  // Funções de validação
  private async findRecipeOrThrow(id: number): Promise<RecipeEntity> {
    const recipe = await this.recipesRepository.findOneBy({ id });
    if (!recipe) throw new NotFoundException(`Recipe with id ${id} not found`);
    return recipe;
  }
}
