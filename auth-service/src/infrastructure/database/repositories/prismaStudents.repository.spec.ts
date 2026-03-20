import { Test, TestingModule } from '@nestjs/testing';
import { PrismaStudentsRepository } from './prismaStudents.repository';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed'),
}));

describe('PrismaStudentsRepository', () => {
  let repository: PrismaStudentsRepository;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      student: {
        findUnique: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaStudentsRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<PrismaStudentsRepository>(PrismaStudentsRepository);
  });

  it('findByControlNumber', async () => {
    prisma.student.findUnique.mockResolvedValue({ id: '1' });
    await repository.findByControlNumber('abc');
    expect(prisma.student.findUnique).toHaveBeenCalledWith({ where: { controlNumber: 'abc' } });
  });

  it('findById', async () => {
    prisma.student.findUnique.mockResolvedValue({ id: '2' });
    await repository.findById('2');
    expect(prisma.student.findUnique).toHaveBeenCalledWith({ where: { id: '2' }, include: { user: true } });
  });

  it('findAll', async () => {
    prisma.student.findMany.mockResolvedValue([]);
    await repository.findAll();
    expect(prisma.student.findMany).toHaveBeenCalledWith({ include: { user: true } });
  });

  it('createStudent', async () => {
    prisma.student.create.mockResolvedValue({ id: '3' });
    await repository.createStudent('c', 'cn', 'e', 'p', 'n', 'l', 'm');
    expect(prisma.student.create).toHaveBeenCalledWith({
      data: {
        career: 'c', controlNumber: 'cn',
        user: { create: { email: 'e', passwordHash: 'p', name: 'n', lastName: 'l', motherLastName: 'm' } }
      },
      include: { user: true }
    });
  });

  it('delete', async () => {
    prisma.student.delete.mockResolvedValue({ id: '1' });
    await repository.delete('1');
    expect(prisma.student.delete).toHaveBeenCalledWith({ where: { id: '1' }, include: { user: true } });
  });

  it('update', async () => {
    prisma.student.update.mockResolvedValue({ id: '4', userId: 'u4' });

    await repository.update('4', { email: 'new@e.com', career: 'X' });

    expect(prisma.student.update).toHaveBeenCalledWith({
      where: { id: '4' },
      data: {
        career: 'X',
        controlNumber: undefined,
        user: {
          update: { email: 'new@e.com', name: undefined, lastName: undefined, motherLastName: undefined }
        }
      },
      include: { user: true }
    });
  });
});
