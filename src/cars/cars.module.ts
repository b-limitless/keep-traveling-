import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { Car } from './car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './cars.service';


@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarsController], 
  providers: [CarService]
})
export class CarsModule {}
