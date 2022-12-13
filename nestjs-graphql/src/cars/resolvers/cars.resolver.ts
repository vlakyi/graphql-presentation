import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from '../cars.service';
import { CreateCarInput } from '../dto/create-car.input';
import { UpdateCarInput } from '../dto/update-car.input';
import { Car } from '../entities/car.entity';

@Resolver()
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query(() => [Car], { name: 'cars' })
  async findAll() {
    return this.carsService.findAll();
  }

  @Query(() => Car, { name: 'car' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Mutation(() => Car, { name: 'createCar' })
  async create(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carsService.create(createCarInput);
  }

  @Mutation(() => Car, { name: 'updateCar' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCarInput') updateCarInput: UpdateCarInput,
  ) {
    return this.carsService.update(id, updateCarInput);
  }

  @Mutation(() => Car, { name: 'removeCar' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
