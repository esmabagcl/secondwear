import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Clothing } from '../clothing/entities/clothing.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Clothing)
    private clothingRepository: Repository<Clothing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createById(userId: number, clothingIds: number[]) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

    const order = new Order();
    order.buyer = user;
    order.items = [];

    for (const id of clothingIds) {
      const clothing = await this.clothingRepository.findOne({ where: { id } });
      if (clothing) {
        const item = new OrderItem();
        item.clothing = clothing;
        order.items.push(item);
      }
    }

    if (order.items.length === 0) {
      throw new NotFoundException('Seçilen ürünler bulunamadı');
    }

    return this.ordersRepository.save(order);
  }

  async findMyOrdersById(userId: number) {
    return this.ordersRepository.find({
      where: { buyer: { id: userId } },
      relations: ['items', 'items.clothing'],
      order: { id: 'DESC' },
    });
  }

  async createByEmail(email: string, clothingIds: number[]) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

    const order = new Order();
    order.buyer = user;
    order.items = [];

    for (const id of clothingIds) {
      const clothing = await this.clothingRepository.findOne({ where: { id } });
      if (clothing) {
        const item = new OrderItem();
        item.clothing = clothing;
        order.items.push(item);
      }
    }

    if (order.items.length === 0) {
      throw new NotFoundException('Seçilen ürünler bulunamadı');
    }

    return this.ordersRepository.save(order);
  }

  async findMyOrdersByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

    return this.ordersRepository.find({
      where: { buyer: { id: user.id } },
      relations: ['items', 'items.clothing'],
      order: { id: 'DESC' },
    });
  }
}
