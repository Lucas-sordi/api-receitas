import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from "src/user/entities/user.entity";
import { ReviewEntity } from 'src/reviews/entities/review.entity';

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

  @Column({ name: 'userId', nullable: false, type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => ReviewEntity, (review) => review.recipe)
  reviews: ReviewEntity[];
}
