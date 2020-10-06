import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { Tour } from '../entity/Tour';
import { User } from '../entity/User';

interface TourSaveArgs {
  id?: number;
  name: string;
}

interface TourAddUserArgs {
  id: number;
  userIds: [number];
}

@Controller()
export class TourController {
  constructor(private entityManager: EntityManager, private currentUser?: User) {}

  @Query()
  tour({ id }: { id: number }) {
    return this.entityManager.findOne(Tour, id);
  }

  @Mutation()
  async tourSave(args: TourSaveArgs) {
    if (!this.currentUser) throw new Error('no user set');

    let inputTour = this.entityManager.create(Tour, args);

    if (args.id) {
      const tour = await this.entityManager.findOneOrFail(Tour, args.id);
      inputTour = this.entityManager.merge(Tour, tour, inputTour);
    } else {
      inputTour.users = [this.currentUser];
    }

    return this.entityManager.save(Tour, inputTour);
  }

  @Mutation()
  async tourAddUser(args: TourAddUserArgs) {
    if (!this.currentUser) throw new Error('no user set');

    const tour = await this.entityManager.findOneOrFail(Tour, args.id, {
      relations: ['users'],
    });
    const users = await this.entityManager.findByIds(User, args.userIds);
    tour.users = [...tour.users, ...users];

    return this.entityManager.save(Tour, tour);
  }

  @Mutation()
  async tourDelete(args: any) {
    await this.entityManager.remove(Tour, args);
    return true;
  }
}
