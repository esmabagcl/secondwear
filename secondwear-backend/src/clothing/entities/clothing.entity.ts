import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Clothing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.clothings, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => User, (user) => user.favorites)
  favoritedBy: User[];
}
