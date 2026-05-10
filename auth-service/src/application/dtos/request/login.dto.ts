import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @Escape()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  password: string;
}