import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTutorUseCase } from './deleteTutor.usecase';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteTutorUseCase', () => {
  let useCase: DeleteTutorUseCase;
  let tutorRepo: any;

  beforeEach(async () => {
    tutorRepo = { findById: jest.fn(), delete: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTutorUseCase,
        { provide: TUTOR_REPOSITORY, useValue: tutorRepo },
      ],
    }).compile();

    useCase = module.get<DeleteTutorUseCase>(DeleteTutorUseCase);
  });

  it('throws NotFoundException if tutor missing', async () => {
    tutorRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute('x')).rejects.toThrow(NotFoundException);
  });

  it('deletes mapped tutor successfully', async () => {
    tutorRepo.findById.mockResolvedValue({ id: 'x' });
    tutorRepo.delete.mockResolvedValue({ id: 'x' });

    const result = await useCase.execute('x');
    expect(result).toBeDefined();
    expect(tutorRepo.delete).toHaveBeenCalledWith('x');
  });
});
