import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class ReservationDto {
 
  @Transform(({ obj }) => obj.car.id)
  @Expose()
  carId: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

}
