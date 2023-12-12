import { Expose, Transform, Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';

export class ReservationDto {
  @Transform(({ obj }) => obj?.car?.id)
  @Expose()
  carId: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  // @Expose()
  // @Type(() => UserDto)
  // user: User

  @Transform(({ obj }) => obj?.user?.id)
  @Expose()
  userId: number;

}
