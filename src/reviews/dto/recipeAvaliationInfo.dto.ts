import { IsInt, IsNumber } from 'class-validator';

export class RecipeAvaliationInfoDto {
  @IsInt()
  readonly totalReviews: number;

  @IsNumber()
  readonly averageAvaliation: number;
}
