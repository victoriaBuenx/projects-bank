import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RefreshToken } from "src/domain/entities/refreshToken.entity";

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async create(refreshToken: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: refreshToken.id,
        userId: refreshToken.userId,
        token: refreshToken.token,
        expiresAt: refreshToken.expiresAt,
        revoked: refreshToken.revoked,
        createdAt: refreshToken.createdAt,
      }
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    if(!refreshToken) return null;

    return new RefreshToken(
      refreshToken.id,
      refreshToken.userId,
      refreshToken.token,
      refreshToken.expiresAt,
      refreshToken.revoked,
      refreshToken.createdAt,
    );
  }

  async revokeByUserId(token: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
  }
}