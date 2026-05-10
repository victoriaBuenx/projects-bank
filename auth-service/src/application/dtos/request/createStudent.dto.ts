import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class CreateStudentsDto {
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  @Trim()
  @Escape()
  controlNumber: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  career: string;

  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @Escape()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 8)
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