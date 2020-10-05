import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tour } from './Tour';
import { FoodRating } from './FoodRating';

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

  @OneToMany((type) => FoodRating, (foodRating) => foodRating.user)
  foodRatings: FoodRating[];
}
