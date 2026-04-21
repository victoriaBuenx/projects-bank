import { Test, TestingModule } from '@nestjs/testing';
import { LogoutUseCase } from './logout.usecase';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import { ConflictException } from '@nestjs/common';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let userRepository: any;
  let refreshTokenRepository: any;

  beforeEach(async () => {
    userRepository = {
      findById: jest.fn(),
    };
    refreshTokenRepository = {
      revokeByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: REFRESH_TOKEN_REPOSITORY, useValue: refreshTokenRepository },
      ],
    }).compile();

    useCase = module.get<LogoutUseCase>(LogoutUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw ConflictException if user not found', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ userId: '1' })).rejects.toThrow(ConflictException);
  });

  it('should successfully logout the user', async () => {
    userRepository.findById.mockResolvedValue({ id: '1' });
    refreshTokenRepository.revokeByUserId.mockResolvedValue(undefined);

    const result = await useCase.execute({ userId: '1' });

    expect(result).toEqual({ message: 'Sesión cerrada correctamente' });
    expect(refreshTokenRepository.revokeByUserId).toHaveBeenCalledWith('1');
  });
});
