import { Controller, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { TourLocation } from '../entity/TourLocation';

@Controller()
export class TourLocationController {
  constructor(private entityManager: EntityManager) {}

  @Query()
  tourLocation({ id }: { id: number }) {
    return this.entityManager.findOne(TourLocation, id);
  }
}
