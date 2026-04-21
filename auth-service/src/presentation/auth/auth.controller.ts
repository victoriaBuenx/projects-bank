import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/request/login.dto';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import { LogoutDto } from 'src/application/dtos/request/logout.dto';
import { LogoutUseCase } from 'src/application/use-cases/logout.usecase';
import { Throttle } from '@nestjs/throttler';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { CreateUserDto } from 'src/application/dtos/request/createUser.dto';
import { RefreshTokenUseCase } from 'src/application/use-cases/refreshToken/refreshToken.usecase';
import { RefreshTokenDto } from 'src/application/dtos/request/refreshToken.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly registerAdminUseCase: RegisterUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) { }

  @Throttle({ short: { ttl: 60000, limit: 3 } })
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log("BODY:", body);
    return this.loginUseCase.execute(body);
  }

  @Throttle({ short: { ttl: 60000, limit: 5 } })
  @Post('register-admin')
  async registerAdmin(@Body() body: CreateUserDto) {
    console.log("BODY:", body);
    return this.registerAdminUseCase.execute(body);
  }

  @Throttle({ short: { ttl: 60000, limit: 10 } })
  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    console.log("BODY:", body);
    return this.refreshTokenUseCase.execute(body);
  }

  @Post('logout')
  async logout(@Body() body: LogoutDto) {
    console.log("BODY:", body);
    return this.logoutUseCase.execute(body)
  }
}
