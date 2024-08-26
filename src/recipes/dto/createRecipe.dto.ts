import { IsString, IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly ingredients: string[];

  @IsString()
  @IsNotEmpty()
  readonly instructions: string;

  @IsInt()
  @IsNotEmpty()
  readonly preparationTime: number;

  @IsInt()
  @IsNotEmpty()
  readonly cookingTime: number;

  @IsInt()
  @IsNotEmpty()
  readonly servings: number;
}
