import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @Escape()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @Escape()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @Escape()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @Escape()
  motherLastName: string;
}