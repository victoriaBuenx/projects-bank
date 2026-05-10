import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  token: string;
}