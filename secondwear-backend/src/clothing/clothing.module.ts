import { Module } from '@nestjs/common';
import { ClothingService } from './clothing.service';
import { ClothingController } from './clothing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothing } from './entities/clothing.entity';
import { Category } from '../categories/entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([Clothing, Category]),
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [ClothingController],
    providers: [ClothingService],
})
export class ClothingModule { }
