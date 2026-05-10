import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { CronModule } from './infrastructure/cron/cron.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    CronModule,
  ],
})
export class AppModule {}
