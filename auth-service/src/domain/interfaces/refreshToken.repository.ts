import { RefreshToken } from "../entities/refreshToken.entity";

export interface RefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeByUserId(userId: string): Promise<void>;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('RefreshTokenRepository');