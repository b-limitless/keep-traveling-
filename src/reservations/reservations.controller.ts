import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReservationService } from './reservations.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CarService } from 'src/cars/cars.service';
import { UsersService } from 'src/users/users.service';

@Controller('reservations')
export class ReservationsController {
    constructor(
         private reservationService: ReservationService, 
         private carService: CarService,
         private userServie: UsersService
         ) {}
    @Post('/')
    @UseGuards(AuthGuard)
    createReservation(@CurrentUser() user: User, @Body() body: CreateReservationDto) {
        // Check if  car exists with the id
        const {carId} = body;
        const carExists = this.carService.findOne(Number(carId));

        if(!carExists) {
            return new NotFoundException('car not found');
        }
        
        return this.reservationService.create(body, user);
    }

}
