import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tour } from './Tour';

@Entity()
export class TourLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @ManyToOne((type) => Tour, (tour) => tour.tourLocations)
  tour: Tour;
}
