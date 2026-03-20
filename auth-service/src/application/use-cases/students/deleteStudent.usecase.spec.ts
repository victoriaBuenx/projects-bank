import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStudentUseCase } from './deleteStudent.usecase';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteStudentUseCase', () => {
  let useCase: DeleteStudentUseCase;
  let studentsRepository: any;

  beforeEach(async () => {
    studentsRepository = { 
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteStudentUseCase,
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
      ],
    }).compile();

    useCase = module.get<DeleteStudentUseCase>(DeleteStudentUseCase);
  });

  it('should throw NotFoundException if missing', async () => {
    studentsRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute('none')).rejects.toThrow(NotFoundException);
  });

  it('should execute delete properly', async () => {
    studentsRepository.findById.mockResolvedValue({ id: '1' });
    studentsRepository.delete.mockResolvedValue({ id: '1' });

    const result = await useCase.execute('1');

    expect(result).toBeDefined();
    expect(studentsRepository.delete).toHaveBeenCalledWith('1');
  });
});
