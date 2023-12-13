import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsPositive, IsDate } from 'class-validator';

export class FilterCarDto {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  make?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minPrice?: number;
  
  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPrice?: number;
  
  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minYear?: number;
  
  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxYear?: number;
  
  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minMileage?: number;
  
  @ApiProperty({required: false})
  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxMileage?: number;

  @ApiProperty({required: false})
  @Transform(({value}) => new Date(value))
  @IsOptional()
  @IsDate()
  startDate: Date

  @ApiProperty({required: false})
  @Transform(({value}) => new Date(value))
  @IsOptional()
  @IsDate()
  endDate: Date

}
