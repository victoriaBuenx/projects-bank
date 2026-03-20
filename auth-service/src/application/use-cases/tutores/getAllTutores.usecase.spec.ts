import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTutoresUseCase } from './getAllTutores.usecase';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';

describe('GetAllTutoresUseCase', () => {
  let useCase: GetAllTutoresUseCase;
  let tutorRepo: any;

  beforeEach(async () => {
    tutorRepo = { findAll: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllTutoresUseCase,
        { provide: TUTOR_REPOSITORY, useValue: tutorRepo },
      ],
    }).compile();

    useCase = module.get<GetAllTutoresUseCase>(GetAllTutoresUseCase);
  });

  it('formats and returns all tutores', async () => {
    tutorRepo.findAll.mockResolvedValue([{
      id: '1', rfc: 'R1', department: 'Math',
      user: { name: 'X', lastName: 'Y', motherLastName: 'Z', email: 'e', role: 'U', isActive: true }
    }]);

    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].department).toBe('Math');
    expect(result[0].name).toBe('X');
  });
});
