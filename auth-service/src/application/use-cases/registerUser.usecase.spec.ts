import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './registerUser.usecase';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { ConflictException } from '@nestjs/common';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: any;
  let hashService: any;

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };
    hashService = { hash: jest.fn().mockResolvedValue('hashedPassword') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: HASH_SERVICE, useValue: hashService },
      ],
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw ConflictException if email exists', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: '1' });

    await expect(useCase.execute({
      email: 'test@example.com',
      password: 'password',
      name: 'John',
      lastName: 'Doe',
      motherLastName: 'Sims'
    })).rejects.toThrow(ConflictException);
  });

  it('should successfully register a user', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue({
      id: '1', email: 'test@example.com'
    });

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password',
      name: 'John',
      lastName: 'Doe',
      motherLastName: 'Sims'
    });

    expect(result).toEqual({ id: '1', email: 'test@example.com' });
    expect(userRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      name: 'John',
      lastName: 'Doe',
      motherLastName: 'Sims'
    }));
  });
});
