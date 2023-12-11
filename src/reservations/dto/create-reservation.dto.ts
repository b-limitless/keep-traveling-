import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class CreateReservationDto {

    @Transform(({value}) => Number(value))
    @IsNumber()
    carId: number;

    @Transform(({value}) => new Date(value))
    @IsDate()
    start: Date;

    @Transform(({value}) => new Date(value))
    @IsDate()
    end: Date;

}