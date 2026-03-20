import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/domain/interfaces/hash.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter implements IHashService {
  private readonly rounds = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
