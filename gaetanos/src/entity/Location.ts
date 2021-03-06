import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { TourLocation } from './TourLocation';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => TourLocation, (tourLocation) => tourLocation.location)
  tourLocations: TourLocation[];
}
