import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateStudentsDto{
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  controlNumber: string;

  @IsNotEmpty()
  @IsString()
  career: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 8)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  motherLastName: string;
}