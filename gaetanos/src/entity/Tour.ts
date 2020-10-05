import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { TourLocation } from './TourLocation';
import { User } from './User';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => TourLocation, (tourLocation) => tourLocation.tour)
  tourLocations: TourLocation[];

  @ManyToMany((type) => User, (user) => user.tours)
  users: User[];
}
