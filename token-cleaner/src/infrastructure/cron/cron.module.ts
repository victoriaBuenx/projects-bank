import { Module } from '@nestjs/common';
import { TokenCleanupCron } from './token-cleanup.cron';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TokenCleanupCron],
})
export class CronModule {}
