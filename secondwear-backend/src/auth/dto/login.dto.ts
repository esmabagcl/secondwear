import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Geçersiz email formatı' })
    @IsNotEmpty({ message: 'Email alanı boş bırakılamaz' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz' })
    password: string;
}
