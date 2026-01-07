import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clothing } from './entities/clothing.entity';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ClothingService {
  constructor(
    @InjectRepository(Clothing)
    private readonly clothingRepository: Repository<Clothing>,
  ) {}

  async findAll() {
    return await this.clothingRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const clothing = await this.clothingRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!clothing) throw new NotFoundException('Ürün bulunamadı.');
    return clothing;
  }

  async create(createClothingDto: CreateClothingDto) {
    const { categoryId, ...rest } = createClothingDto;

    const newClothing = this.clothingRepository.create({
      ...rest,
      category: categoryId ? ({ id: categoryId } as Category) : undefined,
    });

    return await this.clothingRepository.save(newClothing);
  }

  async update(id: number, updateClothingDto: UpdateClothingDto) {
    const clothing = await this.findOne(id);
    const { categoryId, ...rest } = updateClothingDto;

    this.clothingRepository.merge(clothing, rest);

    if (categoryId) {
      clothing.category = { id: categoryId } as Category;
    }

    return await this.clothingRepository.save(clothing);
  }

  async remove(id: number) {
    const clothing = await this.clothingRepository.findOne({ where: { id } });
    if (!clothing) throw new NotFoundException('Ürün bulunamadı.');
    return await this.clothingRepository.remove(clothing);
  }
}
