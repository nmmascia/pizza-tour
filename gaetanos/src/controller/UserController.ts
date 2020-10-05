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
  async userSave(args: { id: number }) {
    let inputUser = this.entityManager.create(User, args);

    if (args.id) {
      const user = await this.entityManager.findOneOrFail(User, args.id);
      inputUser = this.entityManager.merge(User, user, inputUser);
    }

    return this.entityManager.save(User, inputUser);
  }

  @Mutation()
  async userDelete(args: any) {
    await this.entityManager.remove(User, args);
    return true;
  }
}
