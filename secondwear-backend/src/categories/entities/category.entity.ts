import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Clothing } from '../../clothing/entities/clothing.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Clothing, (clothing) => clothing.category)
  clothings: Clothing[];
}
