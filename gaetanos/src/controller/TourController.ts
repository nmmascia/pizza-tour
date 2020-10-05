import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { Tour } from '../entity/Tour';
import { User } from '../entity/User';

@Controller()
export class TourController {
  constructor(private entityManager: EntityManager, private currentUser?: User) {}

  @Query()
  tour({ id }: { id: number }) {
    return this.entityManager.findOne(Tour, id);
  }

  @Mutation()
  tourSave(args: any) {
    return this.entityManager.save(Tour, this.entityManager.create(Tour, args));
  }

  @Mutation()
  async tourDelete(args: any) {
    await this.entityManager.remove(Tour, args);
    return true;
  }
}
