import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReservationService } from './reservations.service';
import { AuthGuard } from '../guard/auth.guard';
import { CarService } from '../cars/cars.service';
import { UsersService } from '../users/users.service';
import { Serialize } from '../users/interceptors/serialize.interceptors';
import { ReservationDto } from './dto/reservation.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';

@Controller('reservations')
@Serialize(ReservationDto)
export class ReservationsController {
  constructor(
    private reservationService: ReservationService,
    private carService: CarService,
    private userServie: UsersService,
  ) {}
  @Post('/')
  @UseGuards(AuthGuard)
  async createReservation(
    @CurrentUser() user: User,
    @Body() body: CreateReservationDto,
  ) {
    // Check if  car exists with the id
    const { carId } = body;
    const car = await this.carService.findOne(Number(carId));

    if (!car) {
      return new NotFoundException('car not found');
    }

    const validateOverLapping = await this.reservationService.isReservationIsOverLapping(body);
    
    if(validateOverLapping) {
      throw new BadRequestException('Can not make reservation. Car is not avaialble');
    }

    return this.reservationService.create(body, user, car);
  }

  @Get('/')
  async findAllReservation() {
    // Only for the testing 
    return this.reservationService.findAll();
  }

  @Delete('/:id')
  async cancelReservation(
    @CurrentUser() user: User,
    @Param() params: CancelReservationDto,
  ) {
    const { id } = params;

    const reservationExists = await this.reservationService.findOne(Number(id));

    if (!reservationExists) {
      throw new NotFoundException('reservation not found');
    }
    const remove = await this.reservationService.cacnelReservation(Number(id));

    if (!remove) {
      throw new BadRequestException(
        'reservation cannot be canceled in the first 24 hours it was made',
      );
    }

    return true;
  }


}
