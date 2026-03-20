import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from './login.usecase';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/interfaces/refreshToken.repository';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('fake-uuid'),
}));

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepository: any;
  let refreshTokenRepository: any;
  let studentsRepository: any;
  let tutorRepository: any;
  let jwtService: any;

  beforeEach(async () => {
    userRepository = { findByEmail: jest.fn() };
    refreshTokenRepository = { create: jest.fn() };
    studentsRepository = { findById: jest.fn() };
    tutorRepository = { findById: jest.fn() };
    jwtService = { sign: jest.fn().mockReturnValue('mock-jwt') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: REFRESH_TOKEN_REPOSITORY, useValue: refreshTokenRepository },
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
        { provide: TUTOR_REPOSITORY, useValue: tutorRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should throw if user not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    await expect(useCase.execute({ email: 'x', password: 'x' })).rejects.toThrow(ConflictException);
  });

  it('should throw if user is inactive', async () => {
    userRepository.findByEmail.mockResolvedValue({ isActive: false });
    await expect(useCase.execute({ email: 'x', password: 'x' })).rejects.toThrow(ConflictException);
  });

  it('should throw if password mismatches', async () => {
    userRepository.findByEmail.mockResolvedValue({ isActive: true, passwordHash: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(useCase.execute({ email: 'x', password: 'x' })).rejects.toThrow(ConflictException);
  });

  it('should login and return tokens', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: 'u1', email: 'test@x.com', role: 'USER', isActive: true, passwordHash: 'hash' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    studentsRepository.findById.mockResolvedValue(null);
    tutorRepository.findById.mockResolvedValue({ id: 't1' }); // Is technically a tutor

    const result = await useCase.execute({ email: 'test@x.com', password: 'password' });

    expect(result).toEqual({ accessToken: 'mock-jwt', refreshToken: 'fake-uuid' });
    expect(jwtService.sign).toHaveBeenCalledWith({ sub: 'u1', email: 'test@x.com', role: 'USER', type: 'TUTOR' });
    expect(refreshTokenRepository.create).toHaveBeenCalled();
  });
});
