import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { CreateStudentsUseCase } from 'src/application/use-cases/students/createStudents.usecase';
import { UpdateStudentsUseCase } from 'src/application/use-cases/students/updateStudents.usecase';
import { GetAllStudentsUseCase } from 'src/application/use-cases/students/getAllStudents.usecase';
import { GetStudentByIdUseCase } from 'src/application/use-cases/students/getStudentById.usecase';
import { DeleteStudentUseCase } from 'src/application/use-cases/students/deleteStudent.usecase';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('StudentController', () => {
  let controller: StudentController;
  let createUseCase: any;
  let updateUseCase: any;
  let getAllUseCase: any;
  let getByIdUseCase: any;
  let deleteUseCase: any;

  beforeEach(async () => {
    createUseCase = { execute: jest.fn() };
    updateUseCase = { execute: jest.fn() };
    getAllUseCase = { execute: jest.fn() };
    getByIdUseCase = { execute: jest.fn() };
    deleteUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        { provide: CreateStudentsUseCase, useValue: createUseCase },
        { provide: UpdateStudentsUseCase, useValue: updateUseCase },
        { provide: GetAllStudentsUseCase, useValue: getAllUseCase },
        { provide: GetStudentByIdUseCase, useValue: getByIdUseCase },
        { provide: DeleteStudentUseCase, useValue: deleteUseCase },
      ],
    })
    .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
    .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
    .compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createUseCase', async () => {
    const dto = { email: 'a', password: 'b', name: 'c', lastName: 'd', motherLastName: 'e', career: 'f', controlNumber: 'g' };
    createUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.registerStudent(dto);
    expect(result).toEqual({ id: '1' });
    expect(createUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should call updateUseCase', async () => {
    updateUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.updateStudent('1', { name: 'new' });
    expect(result).toEqual({ id: '1' });
    expect(updateUseCase.execute).toHaveBeenCalledWith('1', { name: 'new' });
  });

  it('should call get endpoints', async () => {
    getAllUseCase.execute.mockResolvedValue([]);
    const resAll = await controller.getAllStudents();
    expect(resAll).toEqual([]);

    getByIdUseCase.execute.mockResolvedValue({ id: '1' });
    const resId = await controller.getStudentById('1');
    expect(resId).toEqual({ id: '1' });
  });

  it('should call delete endpoint', async () => {
    deleteUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.deleteStudent('1');
    expect(result).toEqual({ id: '1' });
  });
});
