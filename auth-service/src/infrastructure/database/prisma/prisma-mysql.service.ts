import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma-mysql/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaMysqlService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('PrismaMysqlService');

  constructor() {
    const adapter = new PrismaMariaDb({
      host: 'mysql-replica',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'auth_db',
    });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to MySQL replica database');
    } catch (error) {
      this.logger.error('Failed to connect to MySQL replica database', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from MySQL replica database');
  }
}
