import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentsUseCase } from './createStudents.usecase';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';

describe('CreateStudentsUseCase', () => {
  let useCase: CreateStudentsUseCase;
  let studentsRepository: any;
  let userRepository: any;
  let hashService: any;

  beforeEach(async () => {
    studentsRepository = { createStudent: jest.fn(), findByControlNumber: jest.fn() };
    userRepository = { findByEmail: jest.fn() };
    hashService = { hash: jest.fn().mockResolvedValue('hashedPassword') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentsUseCase,
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: HASH_SERVICE, useValue: hashService },
      ],
    }).compile();

    useCase = module.get<CreateStudentsUseCase>(CreateStudentsUseCase);
  });

  it('should throw ConflictException if email exists', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: 'existing' });

    await expect(useCase.execute({
      email: 'test@test.com',
      password: 'pass',
      name: 'Test',
      lastName: 'Last',
      motherLastName: 'Mother',
      career: 'Engineering',
      controlNumber: '123'
    })).rejects.toThrow(ConflictException);
  });

  it('should create student and format output correctly', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    studentsRepository.createStudent.mockResolvedValue({
      id: 'student_id',
      career: 'Engineering',
      controlNumber: '123',
      user: {
        name: 'Test',
        lastName: 'Last',
        motherLastName: 'Mother',
        email: 'test@test.com',
        role: 'USER',
        isActive: true,
      }
    });

    const result = await useCase.execute({
      email: 'test@test.com',
      password: 'pass',
      name: 'Test',
      lastName: 'Last',
      motherLastName: 'Mother',
      career: 'Engineering',
      controlNumber: '123'
    });

    expect(result).toEqual({
      id: 'student_id',
      name: 'Test',
      lastName: 'Last',
      motherLastName: 'Mother',
      email: 'test@test.com',
      role: 'USER',
      isActive: true,
      career: 'Engineering',
      controlNumber: '123',
    });
    
    expect(studentsRepository.createStudent).toHaveBeenCalledWith(
      'Engineering',
      '123',
      'test@test.com',
      'hashedPassword',
      'Test',
      'Last',
      'Mother'
    );
  });
});
