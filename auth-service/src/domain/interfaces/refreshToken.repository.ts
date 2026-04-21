import { RefreshToken } from "generated/prisma/browser";
import { RefreshTokenCreateInput } from "generated/prisma/models";

export interface IRefreshTokenRepository {
  create(rereshToken: RefreshTokenCreateInput ): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeByUserId(userId: string): Promise<void>;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('RefreshTokenRepository');