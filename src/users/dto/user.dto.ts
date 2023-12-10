import { IsBoolean, IsEmail, IsString } from 'class-validator';
export class UserDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  admin?: boolean = false
}
