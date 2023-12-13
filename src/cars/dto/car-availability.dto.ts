import { Expose, Transform, Type } from 'class-transformer';
import { ReservationDto } from '../../reservations/dto/reservation.dto';
import { Reservation } from '../../reservations/reservation.entity';

export class CarAvailabilityDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: string;

  @Transform(({obj}) => obj?.user?.id)
  @Expose()
  userId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  availableFrom: Date;

  @Expose()
  availableTo: Date;
}
