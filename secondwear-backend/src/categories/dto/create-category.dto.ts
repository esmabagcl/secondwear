import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3, { message: 'Kategori adı en az 3 karakter olmalıdır.' })
  name: string;
}