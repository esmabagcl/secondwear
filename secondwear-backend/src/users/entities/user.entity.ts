import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Clothing } from '../../clothing/entities/clothing.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Clothing, (clothing) => clothing.favoritedBy)
  @JoinTable()
  favorites: Clothing[];
}