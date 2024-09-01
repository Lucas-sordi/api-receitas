import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity]), forwardRef(() => ReviewsModule)],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
