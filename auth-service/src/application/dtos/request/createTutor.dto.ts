import { IsNotEmpty, IsRFC3339, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class CreateTutorDto extends CreateUserDto{
  @IsNotEmpty()
  @IsRFC3339()
  rfc: string;

  @IsNotEmpty()
  @IsString()
  department: string;
}