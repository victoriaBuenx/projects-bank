import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RefreshToken } from "generated/prisma/browser";
import { RefreshTokenCreateInput } from "generated/prisma/models";

@Injectable()
export class PrismaRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(refreshToken: RefreshTokenCreateInput): Promise<RefreshToken> {
    return await this.prisma.refreshToken.create({
      data: {
        token: refreshToken.token,
        expiresAt: refreshToken.expiresAt,
        user: refreshToken.user,
      }
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async revokeByUserId(token: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
  }

  async delete(id: string): Promise<void>{
    await this.prisma.refreshToken.delete({
      where: {id},
    });
  }
}