import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_VALIDATOR_SERVICE } from 'src/domain/interfaces/jwt-validator.service';
import type { IJwtValidatorService } from 'src/domain/interfaces/jwt-validator.service';

@Injectable()
export class ValidateJwtUseCase {
  constructor(
    @Inject(JWT_VALIDATOR_SERVICE)
    private readonly jwtValidatorService: IJwtValidatorService,
  ) {}

  async execute(authorizationHeader: string): Promise<{ tokenValido: boolean; usuario: any }> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    const payload = await this.jwtValidatorService.validateToken(token);

    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      tokenValido: true,
      usuario: payload,
    };
  }
}
