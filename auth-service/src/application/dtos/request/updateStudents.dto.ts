import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class UpdateStudentsDto {
  @IsOptional()
  @Matches(/^\d{8}$/)
  @Trim()
  @Escape()
  controlNumber?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  career?: string;

  @IsOptional()
  @IsEmail()
  @Trim()
  @Escape()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 8)
  @Trim()
  password?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  name?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  lastName?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  motherLastName?: string;
}