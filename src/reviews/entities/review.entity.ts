import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { RecipeEntity } from 'src/recipes/entities/recipe.entity';

@Entity({ name: 'review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'avaliation', nullable: false, type: 'int', width: 1 })
  avaliation: number;

  @Column({ name: 'comment', nullable: true, type: 'text' })
  comment: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'recipeId', nullable: false, type: 'int' })
  recipeId: number;

  @Column({ name: 'userId', nullable: false, type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.reviews)
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'id' })
  recipe: RecipeEntity;
}
