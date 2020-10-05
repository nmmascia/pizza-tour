import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tour } from './Tour';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToMany((type) => Tour, (tour) => tour.users)
  @JoinTable()
  tours: Tour[];
}
