import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ClothingService } from './clothing.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('clothing')
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) { }

  @Get()
  findAll() {
    return this.clothingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothingService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  create(@Body() createClothingDto: CreateClothingDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {

      createClothingDto.imageUrl = `/uploads/${file.filename}`;
    }




    return this.clothingService.create(createClothingDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  update(@Param('id') id: string, @Body() updateClothingDto: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      updateClothingDto.imageUrl = `/uploads/${file.filename}`;
    }



    return this.clothingService.update(+id, updateClothingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.clothingService.remove(+id);
  }
}