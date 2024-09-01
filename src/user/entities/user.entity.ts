import { RecipeEntity } from 'src/recipes/entities/recipe.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ name: 'firstName', nullable: false })
  firstName: string;

  @Column({ name: 'lastName', nullable: false })
  lastName: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user)
  recipes: RecipeEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.recipe)
  reviews: ReviewEntity[];
};
