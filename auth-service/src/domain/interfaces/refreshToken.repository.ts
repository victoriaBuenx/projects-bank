import { RefreshToken } from "src/generated/prisma/browser";
import { RefreshTokenCreateInput } from "src/generated/prisma/models";

export interface IRefreshTokenRepository {
  create(rereshToken: RefreshTokenCreateInput ): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeByUserId(userId: string): Promise<void>;
  deleteExpiredTokens(): Promise<number>;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('RefreshTokenRepository');