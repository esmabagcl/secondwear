import { IsString, IsNumber, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClothingDto {
  @IsString()
  @MinLength(3, { message: 'Ürün adı en az 3 karakter olmalıdır.' })
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number; 

  @IsOptional()
  imageUrl?: string;
}