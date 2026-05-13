import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtValidatorService } from 'src/domain/interfaces/jwt-validator.service';

@Injectable()
export class JwtValidatorService implements IJwtValidatorService {
  private readonly secret =
    '4f7b19d4c79d4912510f44b826b102a0956485ef6a5ce3bcb96a97e71a36ed1000312eb581a2f37473ed8373bc0905500d2375e23125647f788ee3b0ee4a9e1a';

  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token, { secret: this.secret });
    } catch {
      return null;
    }
  }
}
