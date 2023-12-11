import { IsDate, IsNumber } from "class-validator";

export class CreateReservationDto {

    @IsNumber()
    carId: number;

    @IsDate()
    start: Date;

    @IsDate()
    end: Date;
    userId: number;
}