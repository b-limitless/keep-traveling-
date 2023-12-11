import {
  IsDate,
    IsNumber,
    IsString,
    Max,
    Min,
    Validate
} from 'class-validator';
import { IsFutureDateConstraint } from '../mis/is-future-date-contraint';
  
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

    @IsDate()
    @Validate(IsFutureDateConstraint)
    availableFrom: Date;

    @IsDate()
    @Validate(IsFutureDateConstraint)
    availableTo: Date;
  }
  