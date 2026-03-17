import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/database/repositories/prismaUser.repository';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    RegisterUserUseCase, 
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
