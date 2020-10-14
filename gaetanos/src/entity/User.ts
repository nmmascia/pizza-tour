import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tour } from './Tour';
import { FoodRating } from './FoodRating';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  password: string;

  @ManyToMany(() => Tour, (tour) => tour.users)
  @JoinTable()
  tours: Tour[];

  @OneToMany(() => FoodRating, (foodRating) => foodRating.user)
  foodRatings: FoodRating[];
}
