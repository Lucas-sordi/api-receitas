import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipe: CreateRecipeDto) {
    return this.recipesService.create(createRecipe);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecipe: CreateRecipeDto) {
    return this.recipesService.update(+id, updateRecipe);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
