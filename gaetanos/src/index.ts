import { bootstrap } from 'vesper';
import { UserController } from './controller/UserController';
import { TourController } from './controller/TourController';
import { TourLocationController } from './controller/TourLocationController';
import { User } from './entity/User';
import { Tour } from './entity/Tour';
import { TourLocation } from './entity/TourLocation';
import { getManager } from 'typeorm';
import { Location } from './entity/Location';

bootstrap({
  port: 3000,
  controllers: [UserController, TourController, TourLocationController],
  entities: [User, Tour, TourLocation, Location],
  schemas: [__dirname + '/schema/**/*.graphql'],
  setupContainer: async (container) => {
    const entityManager = getManager();
    const currentUser = await entityManager.findOne(User, { id: 1 });
    container.set(User, currentUser);
  },
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
