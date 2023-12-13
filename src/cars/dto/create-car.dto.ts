import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
  
  export class CreateCarDto {
    @ApiProperty()
    @Min(1)
    @Max(1000000)
    price: number;
    
    @ApiProperty()
    @IsString()
    make: string;
    
    @ApiProperty()
    @IsString()
    model: string;
    
    @ApiProperty()
    @IsNumber()
    @Min(1920)
    @Max(2050)
    year: number;
    
    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
  }
  