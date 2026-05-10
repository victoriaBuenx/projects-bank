import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class TokenCleanupCron {
  private readonly logger = new Logger(TokenCleanupCron.name);

  constructor(private readonly prisma: PrismaService) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Executing CleanupExpiredTokens cron job');
    try {
      const result = await this.prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
      this.logger.log(`Cleanup completed. Deleted ${result.count} expired refresh token(s).`);
    } catch (error) {
      this.logger.error('Error executing CleanupExpiredTokens cron job', error);
    }
  }
}
