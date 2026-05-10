import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '4f7b19d4c79d4912510f44b826b102a0956485ef6a5ce3bcb96a97e71a36ed1000312eb581a2f37473ed8373bc0905500d2375e23125647f788ee3b0ee4a9e1a',
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
