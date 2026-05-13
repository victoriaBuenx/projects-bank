import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecurityDemoController } from './security-demo.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ValidateJwtUseCase } from 'src/application/use-cases/security-demo/validateJwt.usecase';
import { JWT_VALIDATOR_SERVICE } from 'src/domain/interfaces/jwt-validator.service';
import { JwtValidatorService } from 'src/infrastructure/jwt/jwt-validator.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '4f7b19d4c79d4912510f44b826b102a0956485ef6a5ce3bcb96a97e71a36ed1000312eb581a2f37473ed8373bc0905500d2375e23125647f788ee3b0ee4a9e1a',
    }),
  ],
  controllers: [SecurityDemoController],
  providers: [
    PrismaService,
    JwtStrategy,
    ValidateJwtUseCase,
    {
      provide: JWT_VALIDATOR_SERVICE,
      useClass: JwtValidatorService,
    },
  ],
})
export class SecurityDemoModule {}
