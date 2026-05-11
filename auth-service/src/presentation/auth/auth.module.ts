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
import { RefreshTokenUseCase } from 'src/application/use-cases/refreshToken/refreshToken.usecase';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { GetAllUsersUseCase } from 'src/application/use-cases/getAllUsers.usecase';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';
import { BcryptAdapter } from 'src/infrastructure/adapters/bcrypt.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaMysqlModule } from 'src/infrastructure/database/prisma/prisma-mysql.module';

@Module({
  imports: [
    PrismaMysqlModule,
    JwtModule.register({
      global: true,
      secret: '4f7b19d4c79d4912510f44b826b102a0956485ef6a5ce3bcb96a97e71a36ed1000312eb581a2f37473ed8373bc0905500d2375e23125647f788ee3b0ee4a9e1a',
      signOptions: { expiresIn: '15d' },
    })
  ],
  providers: [
    PrismaService,
    LoginUseCase,
    LogoutUseCase,
    RegisterUserUseCase,
    GetAllUsersUseCase,
    RefreshTokenUseCase,
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
    },
    {
      provide: HASH_SERVICE,
      useClass: BcryptAdapter,
    }
  ],
  controllers: [AuthController],
})
export class AuthModule { }
