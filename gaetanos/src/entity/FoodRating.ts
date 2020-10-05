import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TourLocation } from './TourLocation';
import { User } from './User';
import { Food } from './Food';

@Entity()
export class FoodRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  score?: number;

  @Column({ nullable: true })
  overview?: string;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne((type) => TourLocation, (tourLocation) => tourLocation.foodRatings)
  tourLocation: TourLocation;

  @ManyToOne((type) => User, (user) => user.foodRatings)
  user: User;

  @ManyToOne((type) => Food, (food) => food.foodRatings)
  food: Food;
}
