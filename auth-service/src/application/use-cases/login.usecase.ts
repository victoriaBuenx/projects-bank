import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IRefreshTokenRepository } from "src/domain/interfaces/refreshToken.repository";
import {USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import type { IUserRepository} from "src/domain/interfaces/user.repository";
import { REFRESH_TOKEN_REPOSITORY } from "src/domain/interfaces/refreshToken.repository";
import { LoginResponseDto } from "../dtos/response/loginResponse.dto";
import { LoginDto } from "../dtos/request/login.dto";
import * as bycrypt from 'bcrypt';
import { randomUUID } from "node:crypto";
import { STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";
import type { IStudentsRepository} from "src/domain/interfaces/students.repository";
import { TUTOR_REPOSITORY, type ITutorRepository } from "src/domain/interfaces/tutor.repository";

@Injectable()
export class LoginUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,

    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,

    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,

    private readonly jwtService: JwtService,
  ) {}

  async execute (dto: LoginDto): Promise <LoginResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (!existingUser) {
      throw new ConflictException('Credenciales inválidas');
    }

    if (!existingUser.isActive) {
      throw new ConflictException('Cuenta inactiva');
    }

    const isPasswordValid = await bycrypt.compare(dto.password, existingUser.passwordHash);

    if (!isPasswordValid) {
      throw new ConflictException('Credenciales inválidas');
    }

    const student = await this.studentsRepository.findById(existingUser.id);
    const tutor = await this.tutorRepository.findById(existingUser.id);

    const type = student ? 'STUDENT' : tutor ? 'TUTOR' : 'USER';

    const accessToken = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      type
    });     

    const refreshTokenValue = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepository.create({
      token: refreshTokenValue,
      expiresAt,
      user:{
        connect: {id: existingUser.id}
      }
    });

    return { 
      accessToken,
      refreshToken: refreshTokenValue,
     };
  }
}