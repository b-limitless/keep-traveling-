import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservations.service';
import { CarService } from '../cars/cars.service';
import { UsersService } from '../users/users.service';
import { Car } from '../cars/car.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Car, User])],
  controllers: [ReservationsController], 
  providers: [ReservationService, CarService, UsersService]
})
export class ReservationsModule {}
