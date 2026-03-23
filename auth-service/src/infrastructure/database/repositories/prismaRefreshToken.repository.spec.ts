import { Test, TestingModule } from '@nestjs/testing';
import { PrismaRefreshTokenRepository } from './prismaRefreshToken.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('PrismaRefreshTokenRepository', () => {
  let repository: PrismaRefreshTokenRepository;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      refreshToken: {
        create: jest.fn(),
        updateMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaRefreshTokenRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<PrismaRefreshTokenRepository>(PrismaRefreshTokenRepository);
  });

  it('create delegates to prisma.refreshToken.create', async () => {
    prisma.refreshToken.create.mockResolvedValue({ id: '1' });
    const data = { token: 't', user: { connect: { id: '1' } }, expiresAt: new Date() };
    await repository.create(data);
    expect(prisma.refreshToken.create).toHaveBeenCalledWith({ data });
  });

  it('revokeByUserId updates tokens marking isRevoked as true', async () => {
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
    await repository.revokeByUserId('1');
    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith({
      where: { userId: '1' },
      data: { revoked: true },
    });
  });
});
