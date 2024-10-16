import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  password: string;
}
