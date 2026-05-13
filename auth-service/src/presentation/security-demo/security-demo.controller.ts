import { Controller, Post, Get, Body, UseGuards, Request as NestRequest, Headers, HttpException, HttpStatus, Res, Query, Header, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ValidateJwtUseCase } from 'src/application/use-cases/security-demo/validateJwt.usecase';
import type { Response } from 'express';

@Controller('security-demo')
export class SecurityDemoController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validateJwtUseCase: ValidateJwtUseCase,
  ) { }

  @Get('xss-vulnerable')
  @Header('Content-Security-Policy', '')
  xssVulnerable(@Query('input') input: string, @Res() res: Response) {
    const userInput = `
    <html>
      <body>
        <h1>Hola, ${input || 'invitado'}</h1>
        <p>Intenta ?input=<script>alert(1)</script></p>
      </body>
    </html>
  `;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-XSS-Protection', '0');
    res.send(userInput);
  }


  @Get('xss-protected')
  xssProtected(@Query('input') input: string, @Res() res: Response) {
    const userInput = `
      <html>
        <body>
          <h1>Hola, ${input || 'invitado'}</h1>
          <p>Este endpoint es vulnerable a XSS. Intenta enviar ?input=&lt;script&gt;alert(1)&lt;/script&gt;</p>
        </body>
      </html>
    `;

    const sanitized = this.escapeHtml(userInput);
    return res.send(sanitized);
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
