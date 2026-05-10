import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import {ConfigModule} from '@nestjs/config';
import { StudentModule } from './presentation/student/student.module';
import { TutorModule } from './presentation/tutor/tutor.module';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [AuthModule, StudentModule, TutorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
