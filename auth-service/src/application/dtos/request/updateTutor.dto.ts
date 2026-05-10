import { IsOptional, IsString } from "class-validator";
import { Trim, Escape } from "class-sanitizer";

export class UpdateTutorDto {
  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  rfc?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  department?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @Escape()
  email?: string;

  @IsOptional()
  @IsString()
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
