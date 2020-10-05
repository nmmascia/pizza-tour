import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { TourLocation } from '../entity/TourLocation';
import { Tour } from '../entity/Tour';

interface TourLocationSaveArgs {
  id?: number;
  date: string;
  tourId: number;
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
      const tourLocation = await this.entityManager.findOneOrFail(TourLocation, args.id);
      inputTourLocation = this.entityManager.merge(TourLocation, tourLocation, inputTourLocation);
    }

    const savedTourLocation = await this.entityManager.save(TourLocation, inputTourLocation);
    tour.tourLocations = tour.tourLocations.concat(savedTourLocation);
    await this.entityManager.save(Tour, tour);
    return savedTourLocation;
  }

  @Mutation()
  async tourLocationDelete(args: TourLocationDeleteArgs) {
    await this.entityManager.remove(TourLocation, args);
    return true;
  }
}
