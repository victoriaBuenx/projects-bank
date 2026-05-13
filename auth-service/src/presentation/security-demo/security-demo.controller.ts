import { Controller, Post, Get, Body, UseGuards, Request as NestRequest, Headers, HttpException, HttpStatus, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ValidateJwtUseCase } from 'src/application/use-cases/security-demo/validateJwt.usecase';

@Controller('security-demo')
export class SecurityDemoController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validateJwtUseCase: ValidateJwtUseCase,
  ) { }

  @Post('xss-vulnerable')
  xssVulnerable(@Body() body: Record<string, any>) {
    const userInput = body.input;
    return {
      input: userInput,
      resultado: `<div>${userInput}</div>`,
    };
  }


  @Post('xss-protected')
  xssProtected(@Body() body: Record<string, any>) {
    const userInput = body.input;
    const sanitized = this.escapeHtml(userInput);
    return {
      inputOriginal: userInput,
      inputSanitizado: sanitized,
    };
  }

  @Post('sql-vulnerable')
  sqlVulnerable(@Body() body: Record<string, any>) {
    const email = body.email;
    const queryVulnerable = `SELECT * FROM "User" WHERE email = '${email}'`;

    const inyeccionDetectada = email.includes("'") ||
      email.toUpperCase().includes('OR');

    return {
      query: queryVulnerable,
      inyeccionDetectada,
      resultado: inyeccionDetectada ? [
        { id: 'uuid-1', email: 'admin@system.com', role: 'ADMIN' },
        { id: 'uuid-2', email: 'user1@test.com', role: 'USER' },
      ] : [],
    };
  }

  @Post('sql-protected')
  async sqlProtected(@Body() body: Record<string, any>) {
    const email = body.email;
    const resultado = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true },
    });

    return {
      queryParametrizada: `SELECT * FROM "User" WHERE email = $1`,
      resultado: resultado || 'Usuario no encontrado',
    };
  }

  @Get('jwt-vulnerable')
  jwtVulnerable() {
    return {
      usuarios: [
        { id: 1, email: 'admin@system.com', role: 'ADMIN' },
        { id: 2, email: 'user@test.com', role: 'USER' },
      ],
      credenciales: {
        host: 'postgres-auth',
        database: 'auth_db',
      },
    };
  }

  @Get('jwt-protected')
  async jwtProtected(@Headers('authorization') authorization: string) {
    return this.validateJwtUseCase.execute(authorization);
  }

  private escapeHtml(text: string): string {
    if (!text || typeof text !== 'string') return text;
    const htmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
  }
}
