import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CarAvailabilityParamDto {
  @Transform(({ value }) => Number(value))
  carId: Number;
}
