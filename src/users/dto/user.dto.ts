import { Expose, Type } from 'class-transformer';
import { Car } from '../../cars/car.entity';
import { CarDto } from 'src/cars/dto/car.dto';
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin?: boolean = false

  // @Expose()
  // @Type(() => CarDto)
  // cars: Car[]

  
}
