import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaMysqlService } from "../prisma/prisma-mysql.service";
import { RefreshToken } from "src/generated/prisma/browser";
import { RefreshTokenCreateInput } from "src/generated/prisma/models";

@Injectable()
export class PrismaRefreshTokenRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaMysql: PrismaMysqlService,
  ) { }

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
    return await this.prismaMysql.refreshToken.findUnique({
      where: { token },
    }) as RefreshToken | null;
  }

  async revokeByUserId(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteExpiredTokens(): Promise<number> {
    const { count } = await this.prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return count;
  }
}