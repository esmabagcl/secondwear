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
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const clothing = await this.clothingRepository.findOne({ where: { id: clothingId } });

    if (user && clothing) {
      if (!user.favorites.find(f => f.id === clothing.id)) {
        user.favorites.push(clothing);
        await this.usersRepository.save(user);
      }
    }
  }

  async removeFavorite(userId: number, clothingId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user) {
      user.favorites = user.favorites.filter(f => f.id !== clothingId);
      await this.usersRepository.save(user);
    }
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