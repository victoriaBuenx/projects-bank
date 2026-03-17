import { User } from "src/domain/entities/user.entity";
import {USER_REPOSITORY } from "../../domain/interfaces/user.repository";
import type { IUserRepository } from "src/domain/interfaces/user.repository";
import { Injectable, Inject, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../dtos/request/createUser.dto";
import { UserResponseDto } from "../dtos/response/userResponse.dto";
import { randomUUID } from "crypto";

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

    const user = new User(
      randomUUID(),     
      dto.email,         
      passwordHash,      
      true,              
      'USER',           
    );

    await this.userRepository.create(user);

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
      role: user.role,
    };
  }
}