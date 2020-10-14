import { bootstrap } from 'vesper';
import { UserController } from './controller/UserController';
import { TourController } from './controller/TourController';
import { TourLocationController } from './controller/TourLocationController';
import { User } from './entity/User';
import { Tour } from './entity/Tour';
import { TourLocation } from './entity/TourLocation';
import { getManager } from 'typeorm';
import { Location } from './entity/Location';
import { FoodRating } from './entity/FoodRating';
import { Food } from './entity/Food';
import { FoodRatingController } from './controller/FoodRatingController';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  user: {
    id: number;
  };
}

bootstrap({
  port: 3000,
  controllers: [UserController, TourController, TourLocationController, FoodRatingController],
  entities: [User, Tour, TourLocation, Location, FoodRating, Food],
  schemas: [__dirname + '/schema/**/*.graphql'],
  setupContainer: async (container, action) => {
    const authHeader = action.request?.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      const payload = <TokenPayload>await jwt.verify(token, 'so_secret');
      console.log(payload);
      const entityManager = getManager();
      const currentUser = await entityManager.findOne(User, { id: payload.user.id });
      container.set(User, currentUser);
    }
  },
  cors: true,
})
  .then(() => {
    console.log(
      'Your app is up and running on http://localhost:3000. ' +
        'You can use playground in development mode on http://localhost:3000/playground'
    );
  })
  .catch((error) => {
    console.error(error.stack ? error.stack : error);
  });
