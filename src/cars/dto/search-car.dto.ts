import { IsString } from 'class-validator';

export class SearchCarDto {
  @IsString()
  make: string;

  @IsString()
  model: string;
}
