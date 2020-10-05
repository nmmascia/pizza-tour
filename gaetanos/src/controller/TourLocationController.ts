import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { TourLocation } from '../entity/TourLocation';
import { Tour } from '../entity/Tour';
import { Location } from '../entity/Location';
import { Food } from '../entity/Food';
import { FoodRating } from '../entity/FoodRating';

interface TourLocationSaveArgs {
  id?: number;
  date: string;
  tourId: number;
  location: {
    id?: number;
    name?: string;
  };
}

interface TourLocationAddFoodArgs {
  tourLocationId: number;
  food: {
    id?: number;
    name?: string;
  };
}

interface TourLocationDeleteArgs {
  id: number;
}

@Controller()
export class TourLocationController {
  constructor(private entityManager: EntityManager) {}

  @Query()
  tourLocation({ id }: { id: number }) {
    return this.entityManager.findOne(TourLocation, id);
  }

  @Mutation()
  async tourLocationSave(args: TourLocationSaveArgs) {
    const tour = await this.entityManager.findOneOrFail(Tour, args.tourId, {
      relations: ['tourLocations'],
    });
    let inputTourLocation = this.entityManager.create(TourLocation, args);

    if (args.id) {
      const tourLocation = await this.entityManager.findOneOrFail(TourLocation, args.id, {
        relations: ['location'],
      });
      inputTourLocation = this.entityManager.merge(TourLocation, tourLocation, inputTourLocation);
    }

    let inputLocation = this.entityManager.create(Location, args.location);
    if (args.location.id) {
      const location = await this.entityManager.findOneOrFail(Location, args.location.id);
      inputLocation = this.entityManager.merge(Location, location, inputLocation);
    }
    const savedLocation = await this.entityManager.save(Location, inputLocation);

    inputTourLocation.location = savedLocation;
    const savedTourLocation = await this.entityManager.save(TourLocation, inputTourLocation);

    tour.tourLocations = tour.tourLocations.concat(savedTourLocation);
    await this.entityManager.save(Tour, tour);

    return savedTourLocation;
  }

  @Mutation()
  async tourLocationAddFood(args: TourLocationAddFoodArgs) {
    const tourLocation = await this.entityManager.findOneOrFail(TourLocation, args.tourLocationId, {
      relations: ['tour', 'tour.users', 'foodRatings'],
    });

    let inputFood = this.entityManager.create(Food, args.food);
    if (args.food.id) {
      const food = await this.entityManager.findOneOrFail(Food, args.food.id);
      inputFood = this.entityManager.merge(Food, food, inputFood);
    }

    await this.entityManager.save(inputFood);

    let foodRatings = tourLocation.tour.users.map((user) => {
      return this.entityManager.create(FoodRating, {
        user,
        tourLocation,
        food: inputFood,
      });
    });

    await this.entityManager.save(foodRatings);

    return tourLocation;
  }

  @Mutation()
  async tourLocationDelete(args: TourLocationDeleteArgs) {
    await this.entityManager.remove(TourLocation, args);
    return true;
  }
}
