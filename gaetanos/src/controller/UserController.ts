import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  @Mutation()
  async userLogin(args: { username: string; password: string }) {
    const user = await this.entityManager.findOneOrFail(User, { where: { username: args.username } });
    const isCorrectPassword = await bcrypt.compare(args.password, user.password);

    if (isCorrectPassword) {
      const token = await jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        'so_secret'
      );

      return {
        token,
        user,
      };
    }
  }

  @Mutation()
  async userRegister(args: { username: string; password: string; passwordConfirmation: string }) {
    if (args.password !== args.passwordConfirmation) {
      return {
        token: null,
        user: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const user = <User>await this.entityManager.save(User, {
      username: args.username,
      password: hashedPassword,
    });

    const token = await jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      'so_secret'
    );

    return {
      token,
      user,
    };
  }
}
