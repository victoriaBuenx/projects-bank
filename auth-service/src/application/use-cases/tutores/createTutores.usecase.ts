import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { type IUserRepository, USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import * as bcrypt from 'bcrypt';
import { type ITutorRepository, TUTOR_REPOSITORY } from "src/domain/interfaces/tutor.repository";
import { CreateTutorDto } from "src/application/dtos/request/createTutor.dto";

@Injectable()
export class CreateTutoresUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,
  ) {}

  async execute(dto: CreateTutorDto){
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    }

    const existingTutor = await this.tutorRepository.findByRfc(dto.rfc);

    if (existingTutor) {
      throw new ConflictException("El RFC ya está registrado");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const tutor = await this.tutorRepository.createTutor(
      dto.department,
      dto.rfc,
      dto.email,
      passwordHash,
      dto.name,
      dto.lastName,
      dto.motherLastName
    );

    return {
      id: tutor.id,
      name: tutor.user.name,
      lastName: tutor.user.lastName,
      motherLastName: tutor.user.motherLastName,
      email: tutor.user.email,
      role: tutor.user.role,
      isActive: tutor.user.isActive,
      rfc: tutor.rfc,
      department: tutor.department,
    };
  }
}