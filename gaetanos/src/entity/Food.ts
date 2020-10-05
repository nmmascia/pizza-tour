import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { FoodRating } from './FoodRating';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => FoodRating, (foodRating) => foodRating.user)
  foodRatings: FoodRating[];
}
