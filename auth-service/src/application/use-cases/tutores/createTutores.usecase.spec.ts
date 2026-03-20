import { Test, TestingModule } from '@nestjs/testing';
import { CreateTutoresUseCase } from './createTutores.usecase';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('pwd'),
}));

describe('CreateTutoresUseCase', () => {
  let useCase: CreateTutoresUseCase;
  let tutorRepo: any;
  let userRepo: any;

  beforeEach(async () => {
    tutorRepo = { createTutor: jest.fn(), findByRfc: jest.fn() };
    userRepo = { findByEmail: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTutoresUseCase,
        { provide: TUTOR_REPOSITORY, useValue: tutorRepo },
        { provide: USER_REPOSITORY, useValue: userRepo },
      ],
    }).compile();

    useCase = module.get<CreateTutoresUseCase>(CreateTutoresUseCase);
  });

  it('throws Conflict if email exists', async () => {
    userRepo.findByEmail.mockResolvedValue({ id: '1' });
    await expect(useCase.execute({} as any)).rejects.toThrow(ConflictException);
  });

  it('creates tutor and maps result perfectly', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    tutorRepo.createTutor.mockResolvedValue({
      id: 't1', rfc: 'ABC', department: 'Science', user: { name: 'Dr.', lastName: 'Smith', motherLastName: 'V', email: 'test@s.com', role: 'USER', isActive: true }
    });

    const dto = { department: 'Science', rfc: 'ABC', email: 'test@s.com', password: 'p', name: 'Dr.', lastName: 'Smith', motherLastName: 'V' };
    const result = await useCase.execute(dto);

    expect(result.id).toBe('t1');
    expect(result.department).toBe('Science');
    expect(result.name).toBe('Dr.');
    expect(result.rfc).toBe('ABC');
    expect(tutorRepo.createTutor).toHaveBeenCalled();
  });
});
