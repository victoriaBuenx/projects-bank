import { Test, TestingModule } from '@nestjs/testing';
import { BcryptAdapter } from './bcrypt.adapter';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('BcryptAdapter', () => {
  let adapter: BcryptAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptAdapter],
    }).compile();

    adapter = module.get<BcryptAdapter>(BcryptAdapter);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('hash', () => {
    it('should hash a password successfully', async () => {
      const mockPassword = 'my_password';
      const mockHashed = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashed);

      const result = await adapter.hash(mockPassword);

      expect(result).toBe(mockHashed);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    });
  });

  describe('compare', () => {
    it('should compare a password and a hash successfully', async () => {
      const mockPassword = 'my_password';
      const mockHashed = 'hashed_password';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await adapter.compare(mockPassword, mockHashed);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashed);
    });
  });
});
