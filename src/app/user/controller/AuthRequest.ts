import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
