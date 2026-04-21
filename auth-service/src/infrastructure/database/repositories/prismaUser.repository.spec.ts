import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepository } from './prismaUser.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaUserRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  it('findByEmail delegates to prisma.user.findUnique', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1' });
    const res = await repository.findByEmail('test@e.com');
    expect(res.id).toBe('1');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@e.com' } });
  });

  it('findById delegates to prisma.user.findUnique', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '2' });
    const res = await repository.findById('2');
    expect(res.id).toBe('2');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '2' } });
  });

  it('createUser delegates to prisma.user.create', async () => {
    prisma.user.create.mockResolvedValue({ id: '3' });
    const user = { email: 'a', passwordHash: 'b', name: 'c', lastName: 'd', motherLastName: 'e' } as any;
    const res = await repository.createUser(user);
    expect(res.id).toBe('3');
    expect(prisma.user.create).toHaveBeenCalledWith({ data: {
      email: 'a',
      passwordHash: 'b',
      role: 'ADMIN',
      lastName: 'd',
      motherLastName: 'e',
      name: 'c',
    } });
  });
});
