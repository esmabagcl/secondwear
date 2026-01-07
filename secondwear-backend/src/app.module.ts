import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Clothing } from './clothing/entities/clothing.entity';
import { Category } from './categories/entities/category.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClothingModule } from './clothing/clothing.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'secondwear',
      entities: [User, Role, Clothing, Category, Order, OrderItem],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ClothingModule,
    CategoriesModule,
    OrdersModule,
  ],
})
export class AppModule { }