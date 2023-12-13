import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CarAvailabilityParamDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  carId: Number;
}
