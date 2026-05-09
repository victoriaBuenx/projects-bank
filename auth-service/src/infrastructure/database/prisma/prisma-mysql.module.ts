import { Module } from '@nestjs/common';
import { PrismaMysqlService } from './prisma-mysql.service';

@Module({
  providers: [PrismaMysqlService],
  exports: [PrismaMysqlService],
})
export class PrismaMysqlModule {}
