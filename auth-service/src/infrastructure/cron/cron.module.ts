import { Module } from '@nestjs/common';
import { TokenCleanupCron } from './token-cleanup.cron';
import { CleanupExpiredTokensUseCase } from 'src/application/use-cases/refreshToken/cleanupExpiredTokens.usecase';
import { PrismaRefreshTokenRepository } from 'src/infrastructure/database/repositories/prismaRefreshToken.repository';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PrismaMysqlModule } from '../database/prisma/prisma-mysql.module';

@Module({
  providers: [
    TokenCleanupCron,
    CleanupExpiredTokensUseCase,
    PrismaService,
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  imports: [PrismaMysqlModule]
})
export class CronModule { }
