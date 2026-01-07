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
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_URL ? undefined : 'localhost',
      port: process.env.DATABASE_URL ? undefined : 5432,
      username: process.env.DATABASE_URL ? undefined : 'postgres',
      password: process.env.DATABASE_URL ? undefined : '1234',
      database: process.env.DATABASE_URL ? undefined : 'secondwear',
      entities: [User, Role, Clothing, Category, Order, OrderItem],
      synchronize: true,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    UsersModule,
    AuthModule,
    ClothingModule,
    CategoriesModule,
    OrdersModule,
    RolesModule,
  ],
})
export class AppModule {}
