import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/createUser.dto';
import { ReviewsService } from 'src/reviews/reviews.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private reviewsService: ReviewsService,
    private recipesService: RecipesService,
  ) { }

  async create(createUserBody: CreateUserDto): Promise<UserEntity> {
    const { password: pass } = createUserBody;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = this.usersRepository.create({ ...createUserBody, password: hashedPassword });

    try {
      await this.usersRepository.save(user);
    } catch (e) {
      if (e.code === '23505') { // violação de unicidade 
        throw new BadRequestException('Username already exists');
      } else {
        throw new Error('Internal server error');
      };
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    return user;  
  }

  async findReviewsByUser(userId: number): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    
    return this.reviewsService.findReviewsByUser(userId);
  }

  async findRecipesByUser(userId: number): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    return this.recipesService.findRecipesByUser(userId);
  }
}
