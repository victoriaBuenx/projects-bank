import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import {ConfigModule} from '@nestjs/config';
import { StudentModule } from './presentation/student/student.module';
import { TutorModule } from './presentation/tutor/tutor.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './infrastructure/cron/cron.module';

@Module({
  imports: [AuthModule, StudentModule, TutorModule,
    ScheduleModule.forRoot(),
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 20,
      }
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
