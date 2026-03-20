import {USER_REPOSITORY } from "../../domain/interfaces/user.repository";
import type { IUserRepository } from "src/domain/interfaces/user.repository";
import { Injectable, Inject, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../dtos/request/createUser.dto";
import { UserResponseDto } from "../dtos/response/userResponse.dto";


@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository,
  ){}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if(existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.createUser({
      email: dto.email,
      passwordHash: passwordHash,
      lastName: dto.lastName,
      motherLastName: dto.motherLastName,
      name: dto.name
    });
  } 
}