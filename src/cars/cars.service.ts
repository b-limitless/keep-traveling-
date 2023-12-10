import { Injectable } from "@nestjs/common";
import { Car } from "./car.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private repo: Repository<Car>) {
        this.repo = repo;
    }

    create() {

    }

    search() {

    }

    filter() {
        
    }
}