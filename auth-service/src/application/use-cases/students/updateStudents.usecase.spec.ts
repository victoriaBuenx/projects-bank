import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStudentsUseCase } from './updateStudents.usecase';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';

describe('UpdateStudentsUseCase', () => {
  let useCase: UpdateStudentsUseCase;
  let studentsRepository: any;
  let userRepository: any;

  beforeEach(async () => {
    studentsRepository = {
      findById: jest.fn(),
      findByControlNumber: jest.fn(),
      update: jest.fn(),
    };
    userRepository = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStudentsUseCase,
        { provide: STUDENTS_REPOSITORY, useValue: studentsRepository },
        { provide: USER_REPOSITORY, useValue: userRepository },
      ],
    }).compile();

    useCase = module.get<UpdateStudentsUseCase>(UpdateStudentsUseCase);
  });

  it('should throw Conflict if student not found', async () => {
    studentsRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute('1', {})).rejects.toThrow(ConflictException);
  });

  it('should throw Conflict if email is busy with another user', async () => {
    studentsRepository.findById.mockResolvedValue({ id: '1', userId: 'user1' });
    userRepository.findByEmail.mockResolvedValue({ id: 'user2' });
    
    await expect(useCase.execute('1', { email: 'test@t.com' })).rejects.toThrow(ConflictException);
  });

  it('should throw Conflict if control number is busy with another student', async () => {
    studentsRepository.findById.mockResolvedValue({ id: '1', userId: 'user1' });
    studentsRepository.findByControlNumber.mockResolvedValue({ id: '2' });

    await expect(useCase.execute('1', { controlNumber: '111' })).rejects.toThrow(ConflictException);
  });

  it('should update successfully when valid', async () => {
    studentsRepository.findById.mockResolvedValue({ id: '1', userId: 'u1' });
    userRepository.findByEmail.mockResolvedValue(null);
    studentsRepository.findByControlNumber.mockResolvedValue(null);
    
    studentsRepository.update.mockResolvedValue({
      id: '1', career: 'IS', controlNumber: '11', user: { name: 'n', lastName: 'l', motherLastName: 'm', email: 'e', role: 'U', isActive: true }
    });

    const result = await useCase.execute('1', { name: 'n' });
    expect(result.id).toBe('1');
    expect(studentsRepository.update).toHaveBeenCalledWith('1', { name: 'n' });
  });
});
