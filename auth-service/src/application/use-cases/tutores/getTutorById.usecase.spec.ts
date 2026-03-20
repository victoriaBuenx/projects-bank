import { Test, TestingModule } from '@nestjs/testing';
import { GetTutorByIdUseCase } from './getTutorById.usecase';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetTutorByIdUseCase', () => {
  let useCase: GetTutorByIdUseCase;
  let tutorRepo: any;

  beforeEach(async () => {
    tutorRepo = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTutorByIdUseCase,
        { provide: TUTOR_REPOSITORY, useValue: tutorRepo },
      ],
    }).compile();

    useCase = module.get<GetTutorByIdUseCase>(GetTutorByIdUseCase);
  });

  it('throws NotFound if tutor is missing', async () => {
    tutorRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute('none')).rejects.toThrow(NotFoundException);
  });

  it('fetches and maps a single tutor', async () => {
    tutorRepo.findById.mockResolvedValue({
      id: '2', rfc: 'R2', department: 'Science',
      user: { name: 'A', lastName: 'B', motherLastName: 'C', email: 'e', role: 'U', isActive: true }
    });

    const result = await useCase.execute('2');
    expect(result.id).toBe('2');
    expect(result.rfc).toBe('R2');
  });
});
