import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email veya şifre hatalı');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email veya şifre hatalı');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name,
    };

    return {
      token: this.jwtService.sign(payload),
      role: user.role?.name,
    };
  }

  async register(email: string, password: string, name: string, roleName: string = 'user') {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Bu email zaten kayıtlı');
    }

    const role = await this.rolesService.findByName(roleName);
    if (!role) {
      throw new BadRequestException(`Sistemde "${roleName}" rolü bulunamadı.`);
    }

    const newUser: any = await this.usersService.create({
      email,
      password,
      name,
      role: role,
    });

    return {
      message: 'Kayıt başarılı',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: role.name,
      },
    };
  }
}