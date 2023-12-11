import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReservationService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationService: ReservationService) {}
    @Post('/')
    createReservation(@CurrentUser() user: User, @Body() body: CreateReservationDto) {
        return this.reservationService.create(body, user);
    }

}
