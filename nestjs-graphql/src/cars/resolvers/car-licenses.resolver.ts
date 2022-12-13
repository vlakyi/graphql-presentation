import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../entities/car.entity';
import { License } from '../entities/license.entity';

@Resolver(() => Car)
export class CarLicensesResolver {
  constructor(
    @InjectRepository(License)
    private readonly licensesRepository: Repository<License>,
  ) {}

  @ResolveField('licenses', () => [License])
  async getLicensesOfCar(@Parent() car: Car) {
    return this.licensesRepository
      .createQueryBuilder('license')
      .innerJoin('license.cars', 'cars', 'cars.id = :carId', {
        carId: car.id,
      })
      .getMany();
  }
}
