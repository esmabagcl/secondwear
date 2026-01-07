import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Geçersiz email formatı' })
    @IsNotEmpty({ message: 'Email alanı boş bırakılamaz' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz' })
    @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'İsim alanı boş bırakılamaz' })
    name: string;

    @IsOptional()
    @IsString()
    role?: string;
}
