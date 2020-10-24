import { Resolver, Resolve, ResolverInterface } from 'vesper';
import { EntityManager } from 'typeorm';
import { TourLocation } from '../entity/TourLocation';
import { Tour } from '../entity/Tour';

@Resolver(TourLocation)
export class TourLocationResolver implements ResolverInterface<TourLocation> {
  constructor(private entityManager: EntityManager) {}

  @Resolve()
  tour(entities: TourLocation | TourLocation[]) {
    console.log('Entities:', entities);
    return this.entityManager.createQueryBuilder(Tour, 'tour').getMany();
  }
}
