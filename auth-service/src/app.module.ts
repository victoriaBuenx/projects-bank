import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import {ConfigModule} from '@nestjs/config';
import { StudentModule } from './presentation/student/student.module';

@Module({
  imports: [AuthModule, StudentModule,
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
