import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Tour } from './Tour';
import { Location } from './Location';
import { FoodRating } from './FoodRating';
import { User } from './User';

@Entity()
export class TourLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @ManyToOne((type) => Tour, (tour) => tour.tourLocations)
  tour: Tour;

  @ManyToOne((type) => Location, (location) => location.tourLocations)
  location: Location;

  @OneToMany((type) => FoodRating, (foodRating) => foodRating.tourLocation)
  foodRatings: FoodRating[];

  users: User[];
}
