import { USER_REPOSITORY } from "../../domain/interfaces/user.repository";
import type { IUserRepository } from "src/domain/interfaces/user.repository";
import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/request/createUser.dto";
import { UserResponseDto } from "../dtos/response/userResponse.dto";
import { HASH_SERVICE } from "src/domain/interfaces/hash.service";
import type { IHashService } from "src/domain/interfaces/hash.service";


@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHashService,
  ){}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if(existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await this.hashService.hash(dto.password);

    return await this.userRepository.createUser({
      email: dto.email,
      passwordHash: passwordHash,
      lastName: dto.lastName,
      motherLastName: dto.motherLastName,
      name: dto.name
    });
  } 
}