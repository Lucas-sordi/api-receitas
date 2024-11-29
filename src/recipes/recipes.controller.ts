import { Controller, Get, Post, Body, Param, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RecipeOwnerGuard } from 'src/auth/guards/recipeOwner.guard';
import { GetUserId } from 'src/utils/decorators/getUserId.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createRecipe: CreateRecipeDto, @GetUserId() userId: number) {
    return this.recipesService.create(createRecipe, userId);
  }

  @Get()
  findAll(@Query('page') page: number = 1) {
    return this.recipesService.findAll(page);
  }

  @Get('/search')
  async findRecipesByName(@Query('name') name: string) {
    return this.recipesService.findRecipesByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RecipeOwnerGuard)
  update(@Param('id') id: string, @Body() updateRecipe: CreateRecipeDto) {
    return this.recipesService.update(+id, updateRecipe);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RecipeOwnerGuard)
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
