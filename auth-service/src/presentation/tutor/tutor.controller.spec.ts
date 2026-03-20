import { Test, TestingModule } from '@nestjs/testing';
import { TutorController } from './tutor.controller';
import { CreateTutoresUseCase } from 'src/application/use-cases/tutores/createTutores.usecase';
import { UpdateTutoresUseCase } from 'src/application/use-cases/tutores/updateTutores.usecase';
import { GetAllTutoresUseCase } from 'src/application/use-cases/tutores/getAllTutores.usecase';
import { GetTutorByIdUseCase } from 'src/application/use-cases/tutores/getTutorById.usecase';
import { DeleteTutorUseCase } from 'src/application/use-cases/tutores/deleteTutor.usecase';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('TutorController', () => {
  let controller: TutorController;
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
      controllers: [TutorController],
      providers: [
        { provide: CreateTutoresUseCase, useValue: createUseCase },
        { provide: UpdateTutoresUseCase, useValue: updateUseCase },
        { provide: GetAllTutoresUseCase, useValue: getAllUseCase },
        { provide: GetTutorByIdUseCase, useValue: getByIdUseCase },
        { provide: DeleteTutorUseCase, useValue: deleteUseCase },
      ],
    })
    .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
    .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
    .compile();

    controller = module.get<TutorController>(TutorController);
  });

  it('should call createUseCase', async () => {
    const dto = { email: 'a', password: 'b', name: 'c', lastName: 'd', motherLastName: 'e', department: 'f', rfc: 'g' };
    createUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.registerTutor(dto);
    expect(result).toEqual({ id: '1' });
  });

  it('should call updateUseCase', async () => {
    updateUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.updateTutor('1', { name: 'new' });
    expect(result).toEqual({ id: '1' });
  });

  it('should call get endpoints', async () => {
    getAllUseCase.execute.mockResolvedValue([]);
    const resAll = await controller.getAllTutores();
    expect(resAll).toEqual([]);

    getByIdUseCase.execute.mockResolvedValue({ id: '1' });
    const resId = await controller.getTutorById('1');
    expect(resId).toEqual({ id: '1' });
  });

  it('should call delete endpoint', async () => {
    deleteUseCase.execute.mockResolvedValue({ id: '1' });
    const result = await controller.deleteTutor('1');
    expect(result).toEqual({ id: '1' });
  });
});
