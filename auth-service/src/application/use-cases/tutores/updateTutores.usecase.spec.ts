import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTutoresUseCase } from './updateTutores.usecase';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';

describe('UpdateTutoresUseCase', () => {
  let useCase: UpdateTutoresUseCase;
  let tutorRepo: any;
  let userRepo: any;
  let hashService: any;

  beforeEach(async () => {
    tutorRepo = {
      findById: jest.fn(),
      findByRfc: jest.fn(),
      update: jest.fn(),
    };
    userRepo = {
      findByEmail: jest.fn(),
    };
    hashService = { hash: jest.fn().mockResolvedValue('hashed_pwd') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTutoresUseCase,
        { provide: TUTOR_REPOSITORY, useValue: tutorRepo },
        { provide: USER_REPOSITORY, useValue: userRepo },
        { provide: HASH_SERVICE, useValue: hashService },
      ],
    }).compile();

    useCase = module.get<UpdateTutoresUseCase>(UpdateTutoresUseCase);
  });

  it('throws Conflict if tutor not found', async () => {
    tutorRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute('1', {})).rejects.toThrow(ConflictException);
  });

  it('throws Conflict if email is busy with another user', async () => {
    tutorRepo.findById.mockResolvedValue({ id: '1', userId: 'user1' });
    userRepo.findByEmail.mockResolvedValue({ id: 'user2' });
    
    await expect(useCase.execute('1', { email: 't@t.com' })).rejects.toThrow(ConflictException);
  });

  it('throws Conflict if RFC is busy with another tutor', async () => {
    tutorRepo.findById.mockResolvedValue({ id: '1', userId: 'user1' });
    tutorRepo.findByRfc.mockResolvedValue({ id: '2' });

    await expect(useCase.execute('1', { rfc: 'R1' })).rejects.toThrow(ConflictException);
  });

  it('updates successfully when valid', async () => {
    tutorRepo.findById.mockResolvedValue({ id: '1', userId: 'u1' });
    userRepo.findByEmail.mockResolvedValue(null);
    tutorRepo.findByRfc.mockResolvedValue(null);
    
    tutorRepo.update.mockResolvedValue({
      id: '1', rfc: 'R', department: 'D', user: { name: 'n', lastName: 'l', motherLastName: 'm', email: 'e', role: 'U', isActive: true }
    });

    const result = await useCase.execute('1', { name: 'n' });
    expect(result.id).toBe('1');
    expect(tutorRepo.update).toHaveBeenCalledWith('1', { name: 'n' });
  });
});
