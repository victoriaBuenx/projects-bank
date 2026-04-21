import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateStudentsDto{
  @IsOptional()
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  controlNumber?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  career?: string;

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