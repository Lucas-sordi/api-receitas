import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false, type: 'varchar' })
  name: string;

  @Column({ name: 'ingredients', nullable: false, type: 'text', array: true })
  ingredients: string[];

  @Column({ name: 'instructions', nullable: false, type: 'text' })
  instructions: string;

  @Column({ name: 'preparationTime', nullable: false, type: 'int' })
  preparationTime: number;

  @Column({ name: 'cookingTime', nullable: false, type: 'int' })
  cookingTime: number;

  @Column({ name: 'totalTime', nullable: false, type: 'int' })
  totalTime: number;

  @Column({ name: 'servings', nullable: false, type: 'int' })
  servings: number;

  @Column({ name: 'views', nullable: false, type: 'int', default: 0 })
  views: number;
}
