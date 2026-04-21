import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenUseCase } from './refreshToken.usecase';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';

describe('RefreshTokenUseCase', () => {
  let useCase: RefreshTokenUseCase;
  let refreshTokenRepository: any;
  let userRepository: any;
  let jwtService: any;

  beforeEach(async () => {
    refreshTokenRepository = { findByToken: jest.fn() };
    userRepository = { findById: jest.fn() };
    jwtService = { sign: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenUseCase,
        { provide: REFRESH_TOKEN_REPOSITORY, useValue: refreshTokenRepository },
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    useCase = module.get<RefreshTokenUseCase>(RefreshTokenUseCase);
  });

  it('throws ConflictException if token is invalid', async () => {
    refreshTokenRepository.findByToken.mockResolvedValue(null);
    await expect(useCase.execute({ refreshToken: 'invalid' })).rejects.toThrow(ConflictException);
  });

  it('throws ConflictException if user is not found', async () => {
    refreshTokenRepository.findByToken.mockResolvedValue({ userId: 'u1' });
    userRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute({ refreshToken: 'valid' })).rejects.toThrow(ConflictException);
  });

  it('throws ConflictException if user is inactive', async () => {
    refreshTokenRepository.findByToken.mockResolvedValue({ userId: 'u1' });
    userRepository.findById.mockResolvedValue({ isActive: false });
    await expect(useCase.execute({ refreshToken: 'valid' })).rejects.toThrow(ConflictException);
  });

  it('returns accessToken if valid', async () => {
    refreshTokenRepository.findByToken.mockResolvedValue({ userId: 'u1' });
    userRepository.findById.mockResolvedValue({ id: 'u1', email: 'test@t.com', role: 'USER', isActive: true });
    jwtService.sign.mockReturnValue('new-token');

    const result = await useCase.execute({ refreshToken: 'valid' });

    expect(result).toEqual({ accessToken: 'new-token' });
    expect(jwtService.sign).toHaveBeenCalledWith({ id: 'u1', email: 'test@t.com', role: 'USER' });
  });
});
