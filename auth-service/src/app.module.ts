import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AuthModule } from './presentation/auth/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
