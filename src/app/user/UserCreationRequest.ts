import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreationRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
