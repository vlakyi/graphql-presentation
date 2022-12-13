import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsResolver } from './resolvers/cars.resolver';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { License } from './entities/license.entity';
import { CarLicensesResolver } from './resolvers/car-licenses.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Car, License])],
  providers: [CarsResolver, CarsService, CarLicensesResolver],
})
export class CarsModule {}
