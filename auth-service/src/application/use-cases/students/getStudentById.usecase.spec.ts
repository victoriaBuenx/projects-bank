import { Test, TestingModule } from '@nestjs/testing';
import { GetStudentByIdUseCase } from './getStudentById.usecase';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetStudentByIdUseCase', () => {
  let useCase: GetStudentByIdUseCase;
  let studentsRepository: any;

  beforeEach(async () => {
    studentsRepository = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStudentByIdUseCase,
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
      ],
    }).compile();

    useCase = module.get<GetStudentByIdUseCase>(GetStudentByIdUseCase);
  });

  it('should throw NotFoundException if missing', async () => {
    studentsRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute('none')).rejects.toThrow(NotFoundException);
  });

  it('should fetch and format a single student', async () => {
    studentsRepository.findById.mockResolvedValue({
      id: '1',
      career: 'ISIC',
      controlNumber: '111',
      user: {
        name: 'John',
        lastName: 'Doe',
        motherLastName: 'Smith',
        email: 'j@d.com',
        role: 'USER',
        isActive: true,
      }
    });

    const result = await useCase.execute('1');

    expect(result.id).toBe('1');
    expect(result.career).toBe('ISIC');
    expect(result.name).toBe('John');
  });
});
