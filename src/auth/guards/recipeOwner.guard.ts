import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class RecipeOwnerGuard implements CanActivate {
  constructor(
    private readonly recipeService: RecipesService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const recipeId = request.params.id;

    if (!user || !recipeId) {
      throw new UnauthorizedException();
    }

    const recipe = await this.recipeService.findOne(recipeId);

    if (!recipe || recipe.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
