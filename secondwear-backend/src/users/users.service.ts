import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Clothing } from '../clothing/entities/clothing.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Clothing)
    private clothingRepository: Repository<Clothing>,
  ) { }

  async create(userData: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword
    });
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['role']
    });
  }

  async addFavorite(userId: number, clothingId: number) {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'favorites')
        .of(userId)
        .add(clothingId);
    } catch (error) {
      // Duplicate insert hatasını yut (zaten favorideyse sorun yok)
      // Postgres error code 23505 (unique_violation)
      // Ancak loglamak iyidir
      console.log('Favori ekleme uyarısı (zaten ekli olabilir):', error.message);
    }
  }

  async removeFavorite(userId: number, clothingId: number) {
    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'favorites')
      .of(userId)
      .remove(clothingId);
  }

  async findProfileById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role', 'favorites'],
      order: {
        id: 'DESC'
      }
    });

    return user;
  }

  async findProfile(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['role', 'favorites', 'orders', 'orders.items', 'orders.items.clothing']
    });
  }
  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['role']
    });
  }
}