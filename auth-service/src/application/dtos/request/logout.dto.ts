import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class LogoutDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  token: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}