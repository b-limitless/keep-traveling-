import { Injectable } from '@nestjs/common';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { SearchCarDto } from './dto/search-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private repo: Repository<Car>) {
    this.repo = repo;
  }

  create(carDto: CreateCarDto, user: User) {
    const car = this.repo.create(carDto);
    car.user = user;
    return this.repo.save(car);
  }

  async find() {
    return this.repo.find();
  }

  search({ make, model }: SearchCarDto) {
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('make= :make', { make })
      .orWhere('model= :model', { model })
      .limit(20)
      .getRawMany();
  }

  async filter({
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    startDate,
    endDate,
  }: FilterCarDto) {
    const queryBuilder = this.repo.createQueryBuilder('car');

    if (make) {
      queryBuilder.andWhere('car.make = :make', { make });
    }

    if (model) {
      queryBuilder.andWhere('car.model = :model', { model });
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('car.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    }

    if (minYear !== undefined && maxYear !== undefined) {
      queryBuilder.andWhere('car.year BETWEEN :minYear AND :maxYear', {
        minYear,
        maxYear,
      });
    }

    if (minMileage !== undefined && maxMileage !== undefined) {
      queryBuilder.andWhere('car.mileage BETWEEN :minMileage AND :maxMileage', {
        minMileage,
        maxMileage,
      });
    }

    queryBuilder
      .leftJoinAndSelect('car.reservations', 'reservation') // Join reservations
      .leftJoinAndSelect('reservation.user', 'user') // Join user from reservation
      .leftJoinAndSelect('car.user', 'carUser') // Join user from car
      .addSelect(['user.id AS userId']) // Select userId from user entity in reservation
      .addSelect(['carUser.id AS carUserId']) // Select userId from user entity in car
      .addSelect([
        'car.id AS carId',
        'car.price',
        'car.year',
        'car.make',
        'car.model',
        'car.mileage',
        'car.createdAt',
        'car.updatedAt',
        'car.availableFrom',
        'car.availableTo',
      ]); // Select car attributes

    if (startDate && endDate) {
      queryBuilder.andWhere(
        '(reservation.start >= :endDate OR reservation.end <= :startDate)',
        {
          startDate,
          endDate,
        },
      );
    }

    const res = await queryBuilder.limit(20).getMany();

    console.log('res', JSON.stringify(res, null, 2));

    return res;
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }
}
