import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateTutorDto{
  @IsOptional()
  @IsNotEmpty()
  @Matches(/^[A-Z&Ñ]{3,4}\d{6}[A-Z\d]{3}$/)
  rfc?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  department?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(4, 8)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motherLastName?: string;
}
