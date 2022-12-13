import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/car.entity';
import { License } from './entities/license.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  async findAll() {
    return this.carRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
    });

    if (!car) {
      throw new UserInputError(`Car #${id} does not exist`);
    }

    return car;
  }

  async create(createCarInput: CreateCarInput) {
    const licenses = await Promise.all(
      createCarInput.licenses.map((license) =>
        this.preloadLicenseByNumber(license),
      ),
    );

    const car = this.carRepository.create({ ...createCarInput, licenses });

    return this.carRepository.save(car);
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    const licenses =
      updateCarInput.licenses &&
      (await Promise.all(
        updateCarInput.licenses.map((license) =>
          this.preloadLicenseByNumber(license),
        ),
      ));

    const car = await this.carRepository.preload({
      id,
      ...updateCarInput,
      licenses,
    });

    if (!car) {
      throw new UserInputError(`Car #${id} does not exist`);
    }

    return this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);

    const removedCar = await this.carRepository.remove(car);
    return { ...removedCar, id };
  }

  private async preloadLicenseByNumber(licenseNo: string): Promise<License> {
    const existingLicense = await this.licenseRepository.findOne({
      where: { licenseNo },
    });

    if (existingLicense) {
      return existingLicense;
    }

    return this.licenseRepository.create({ licenseNo });
  }
}
