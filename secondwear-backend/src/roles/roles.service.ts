import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(name: string): Promise<Role> {
    const role = this.rolesRepository.create({ name });
    return this.rolesRepository.save(role);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOne({ where: { name } });
  }

  async createIfNotExists(name: string): Promise<Role> {
    let role = await this.findByName(name);
    if (!role) {
      role = await this.create(name);
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }
}