import { IsString, IsInt, IsNotEmpty, Max, Min, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  readonly avaliation: number;

  @IsString()
  @IsOptional()
  readonly comment?: string;

  @IsInt()
  @IsNotEmpty()
  readonly recipeId: number;
}
