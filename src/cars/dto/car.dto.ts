import { Expose, Transform, Type } from 'class-transformer';
import { ReservationDto } from 'src/reservations/dto/reservation.dto';
import { Reservation } from 'src/reservations/reservation.entity';

export class CarDto {
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

  @Transform(({obj}) => obj.user.id)
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

  @Expose()
  @Type(() => ReservationDto)
  reservations: Reservation[]
}
