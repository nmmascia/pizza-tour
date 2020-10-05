import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';

@Controller()
export class UserController {
  constructor(private entityManager: EntityManager) {}

  @Query()
  user({ id }: { id: number }) {
    return this.entityManager.findOne(User, id);
  }

  @Mutation()
  userSave(args: any) {
    return this.entityManager.save(User, this.entityManager.create(User, args));
  }

  @Mutation()
  async userDelete(args: any) {
    await this.entityManager.remove(User, args);
    return true;
  }
}
