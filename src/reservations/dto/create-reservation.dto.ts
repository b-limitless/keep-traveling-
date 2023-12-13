import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class CreateReservationDto {
    @ApiProperty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    carId: number;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    @IsDate()
    start: Date;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    @IsDate()
    end: Date;

}