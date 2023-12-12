import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsPositive, IsDate } from 'class-validator';

export class FilterCarDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minPrice?: number;
  
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPrice?: number;
  
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minYear?: number;
  
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxYear?: number;
  
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minMileage?: number;
  
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxMileage?: number;

  @Transform(({value}) => new Date(value))
  @IsOptional()
  @IsDate()
  startDate: Date


  @Transform(({value}) => new Date(value))
  @IsOptional()
  @IsDate()
  endDate: Date

}
