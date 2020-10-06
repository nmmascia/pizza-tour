import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { FoodRating } from '../entity/FoodRating';
import { User } from '../entity/User';

interface FoodRatingSaveArgs {
  id?: number;
  score: number;
}

@Controller()
export class FoodRatingController {
  constructor(private entityManager: EntityManager, private currentUser?: User) {}

  @Mutation()
  async foodRatingSave(args: FoodRatingSaveArgs) {
    if (!this.currentUser) throw new Error('no user set');

    let inputFoodRating = this.entityManager.create(FoodRating, args);

    if (args.id) {
      const foodRating = await this.entityManager.findOneOrFail(FoodRating, args.id);
      inputFoodRating = this.entityManager.merge(FoodRating, foodRating, inputFoodRating);
    }

    return this.entityManager.save(FoodRating, inputFoodRating);
  }
}
