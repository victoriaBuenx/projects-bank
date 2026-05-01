import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CleanupExpiredTokensUseCase } from 'src/application/use-cases/refreshToken/cleanupExpiredTokens.usecase';

@Injectable()
export class TokenCleanupCron {
  private readonly logger = new Logger(TokenCleanupCron.name);

  constructor(
    private readonly cleanupExpiredTokensUseCase: CleanupExpiredTokensUseCase,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Executing CleanupExpiredTokens cron job');
    try {
      const deletedCount = await this.cleanupExpiredTokensUseCase.execute();
      this.logger.log(`Cleanup completed. Deleted ${deletedCount} expired refresh token(s).`);
    } catch (error) {
      this.logger.error('Error executing CleanupExpiredTokens cron job', error);
    }
  }
}
