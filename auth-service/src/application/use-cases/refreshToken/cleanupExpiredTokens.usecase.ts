import { Inject, Injectable } from '@nestjs/common';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import type { IRefreshTokenRepository } from 'src/domain/interfaces/refreshToken.repository';

@Injectable()
export class CleanupExpiredTokensUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(): Promise<number> {
    return await this.refreshTokenRepository.deleteExpiredTokens();
  }
}
