import { Controller, Post, Body} from '@nestjs/common';
import { CreateUserDto } from "src/application/dtos/request/createUser.dto";
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase, // ← faltaba esto
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto){
    console.log("BODY:", body);
    return this.registerUserUseCase.execute(body);
  }
}
