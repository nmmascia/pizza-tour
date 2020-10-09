import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tour } from './Tour';
import { FoodRating } from './FoodRating';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  url: string;

  @ManyToMany(() => Tour, (tour) => tour.users)
  @JoinTable()
  tours: Tour[];

  @OneToMany(() => FoodRating, (foodRating) => foodRating.user)
  foodRatings: FoodRating[];
}
