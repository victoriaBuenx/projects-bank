import { IsNotEmpty, IsString } from "class-validator";
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

  @IsNotEmpty()
  @IsString()
  @Trim()
  @Escape()
  userId: string;
}