import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto{
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 8)
  password: string;
}