import { Controller, Post, Body, Get, UseGuards, Request as NestRequest } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/request/login.dto';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import { LogoutDto } from 'src/application/dtos/request/logout.dto';
import { LogoutUseCase } from 'src/application/use-cases/logout.usecase';
import { Throttle } from '@nestjs/throttler';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { CreateUserDto } from 'src/application/dtos/request/createUser.dto';
import { RefreshTokenUseCase } from 'src/application/use-cases/refreshToken/refreshToken.usecase';
import { RefreshTokenDto } from 'src/application/dtos/request/refreshToken.dto';
import { GetAllUsersUseCase } from 'src/application/use-cases/getAllUsers.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly registerAdminUseCase: RegisterUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) { }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard)
  validateToken(@NestRequest() req) {
    return {
      isValid: true,
      user: req.user,
    };
  }

  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log("BODY:", body);
    return this.loginUseCase.execute(body);
  }

  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Post('register-admin')
  async registerAdmin(@Body() body: CreateUserDto) {
    console.log("BODY:", body);
    return this.registerAdminUseCase.execute(body);
  }

  @Throttle({ default: { ttl: 60000, limit: 10 } })
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

  @Get('users')
  async getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }
}
