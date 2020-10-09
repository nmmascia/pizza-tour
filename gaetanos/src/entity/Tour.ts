import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { TourLocation } from './TourLocation';
import { User } from './User';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TourLocation, (tourLocation) => tourLocation.tour)
  tourLocations: TourLocation[];

  @ManyToMany(() => User, (user) => user.tours)
  users: User[];
}
