import { Test, TestingModule } from '@nestjs/testing';
import { GetAllStudentsUseCase } from './getAllStudents.usecase';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';

describe('GetAllStudentsUseCase', () => {
  let useCase: GetAllStudentsUseCase;
  let studentsRepository: any;

  beforeEach(async () => {
    studentsRepository = { findAll: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllStudentsUseCase,
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
      ],
    }).compile();

    useCase = module.get<GetAllStudentsUseCase>(GetAllStudentsUseCase);
  });

  it('should format and return all students', async () => {
    studentsRepository.findAll.mockResolvedValue([{
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
    }]);

    const result = await useCase.execute();

    expect(result).toEqual([{
      id: '1',
      name: 'John',
      lastName: 'Doe',
      motherLastName: 'Smith',
      email: 'j@d.com',
      role: 'USER',
      isActive: true,
      career: 'ISIC',
      controlNumber: '111',
    }]);
  });
});
