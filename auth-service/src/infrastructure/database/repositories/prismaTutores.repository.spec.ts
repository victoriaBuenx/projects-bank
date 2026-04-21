import { Test, TestingModule } from '@nestjs/testing';
import { PrismaTutoresRepository } from './prismaTutores.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('PrismaTutoresRepository', () => {
  let repository: PrismaTutoresRepository;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      tutor: {
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
        PrismaTutoresRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<PrismaTutoresRepository>(PrismaTutoresRepository);
  });

  it('findByRfc', async () => {
    prisma.tutor.findUnique.mockResolvedValue({ id: '1' });
    await repository.findByRfc('abc');
    expect(prisma.tutor.findUnique).toHaveBeenCalledWith({ where: { rfc: 'abc' } });
  });

  it('findById', async () => {
    prisma.tutor.findUnique.mockResolvedValue({ id: '2' });
    await repository.findById('2');
    expect(prisma.tutor.findUnique).toHaveBeenCalledWith({ where: { id: '2' }, include: { user: true } });
  });

  it('findAll', async () => {
    prisma.tutor.findMany.mockResolvedValue([]);
    await repository.findAll();
    expect(prisma.tutor.findMany).toHaveBeenCalledWith({ include: { user: true } });
  });

  it('createTutor', async () => {
    prisma.tutor.create.mockResolvedValue({ id: '3' });
    await repository.createTutor('d', 'r', 'e', 'p', 'n', 'l', 'm');
    expect(prisma.tutor.create).toHaveBeenCalledWith({
      data: {
        department: 'd', rfc: 'r',
        user: { create: { email: 'e', passwordHash: 'p', name: 'n', lastName: 'l', motherLastName: 'm' } }
      },
      include: { user: true }
    });
  });

  it('delete', async () => {
    prisma.tutor.delete.mockResolvedValue({ id: '1' });
    await repository.delete('1');
    expect(prisma.tutor.delete).toHaveBeenCalledWith({ where: { id: '1' }, include: { user: true } });
  });

  it('update', async () => {
    prisma.tutor.update.mockResolvedValue({ id: '4', userId: 'u4' });

    await repository.update('4', { email: 'new@e.com', department: 'X', password: 'pwd' });

    expect(prisma.tutor.update).toHaveBeenCalledWith({
      where: { id: '4' },
      data: {
        department: 'X',
        rfc: undefined,
        user: {
          update: { email: 'new@e.com', name: undefined, lastName: undefined, motherLastName: undefined, passwordHash: 'pwd' }
        }
      },
      include: { user: true }
    });
  });
});
