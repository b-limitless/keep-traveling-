import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchCarDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;
}
