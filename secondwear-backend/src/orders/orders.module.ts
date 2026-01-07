import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Clothing } from '../clothing/entities/clothing.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem, Clothing, User])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }
