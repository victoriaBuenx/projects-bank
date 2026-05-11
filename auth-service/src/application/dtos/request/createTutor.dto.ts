import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class CreateTutoresDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  rfc: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  department: string;

  @IsEmail()
  @IsNotEmpty()
  @Trim()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  motherLastName: string;
}