import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('secret') },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should throw UnauthorizedException if payload lacks sub/id', async () => {
    await expect(strategy.validate({ email: 'test' })).rejects.toThrow(UnauthorizedException);
  });

  it('should return mapped user on success', async () => {
    const result = await strategy.validate({ sub: 'user1', email: 'test@t.com', role: 'ADMIN' });
    expect(result).toEqual({ userId: 'user1', email: 'test@t.com', role: 'ADMIN' });
  });
});
