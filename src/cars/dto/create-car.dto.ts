import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
  
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
  