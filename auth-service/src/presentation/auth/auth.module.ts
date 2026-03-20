import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/database/repositories/prismaUser.repository';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import { PrismaRefreshTokenRepository } from 'src/infrastructure/database/repositories/prismaRefreshToken.repository';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import { LogoutUseCase } from 'src/application/use-cases/logout.usecase';
import { PrismaStudentsRepository } from 'src/infrastructure/database/repositories/prismaStudents.repository';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { PrismaTutoresRepository } from 'src/infrastructure/database/repositories/prismaTutores.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15d' }, 
      }),
    })
  ],
  providers: [
    PrismaService,
    LoginUseCase,
    LogoutUseCase,
    RegisterUserUseCase,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: PrismaRefreshTokenRepository,
    },
    {
      provide: STUDENTS_REPOSITORY,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: TUTOR_REPOSITORY,
      useClass: PrismaTutoresRepository,
    }
  ],
  controllers: [AuthController],
})
export class AuthModule {}
