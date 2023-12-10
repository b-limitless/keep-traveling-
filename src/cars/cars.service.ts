import { Injectable } from "@nestjs/common";
import { Car } from "./car.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { CreateCarDto } from "./dto/create-car.dto";
import { SearchCarDto } from "./dto/search-car.dto";

@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private repo: Repository<Car>) {
        this.repo = repo;
    }

    create(carDto: CreateCarDto, user:User) {
        const car = this.repo.create(carDto);
        car.user = user;
        return this.repo.save(car);
    }

    search({make, model}:SearchCarDto) {
        return this.repo.createQueryBuilder()
        .select('*')
        .where('make= :make', {make})
        .orWhere('model= :model', {model})
        .limit(20)
        .getRawMany();
    }

    filter() {

    }
}