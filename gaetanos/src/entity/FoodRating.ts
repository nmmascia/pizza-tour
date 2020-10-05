import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TourLocation } from './TourLocation';
import { User } from './User';

@Entity()
export class FoodRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score?: number;

  @Column()
  overview?: string;

  @Column()
  notes?: string;

  @ManyToOne((type) => TourLocation, (tourLocation) => tourLocation.foodRatings)
  tourLocation: TourLocation;

  @ManyToOne((type) => User, (user) => user.foodRatings)
  user: User;
}
