import {
  IsDate,
    IsNumber,
    IsString,
    Max,
    Min,
    Validate
} from 'class-validator';
import { IsFutureDateConstraint } from '../mis/is-future-date-contraint';
import { Transform } from 'class-transformer';
  
  export class CreateCarDto {
    @Min(1)
    @Max(1000000)
    price: number;
    
    @IsString()
    make: string;
    
    @IsString()
    model: string;
    
    @IsNumber()
    @Min(1920)
    @Max(2050)
    year: number;
    
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @Transform(({value}) => new Date(value))
    @IsDate()
    // @Validate(IsFutureDateConstraint)
    availableFrom: Date;

    @Transform(({value}) => new Date(value))
    @IsDate()
    // @Validate(IsFutureDateConstraint)
    availableTo: Date;
  }
  