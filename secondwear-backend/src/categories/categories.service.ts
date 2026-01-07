import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({ relations: ['clothings'] });
  }

  create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
