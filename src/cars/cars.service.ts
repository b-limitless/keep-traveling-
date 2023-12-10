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

  search({ make, model }: SearchCarDto) {
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('make= :make', { make })
      .orWhere('model= :model', { model })
      .limit(20)
      .getRawMany();
  }

  filter({
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
  }: FilterCarDto) {
    const queryBuilder = this.repo.createQueryBuilder();

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

    return queryBuilder.limit(20).getRawMany();
  }
}
