import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import {ConfigModule} from '@nestjs/config';
import { StudentModule } from './presentation/student/student.module';
import { TutorModule } from './presentation/tutor/tutor.module';

@Module({
  imports: [AuthModule, StudentModule, TutorModule,
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
