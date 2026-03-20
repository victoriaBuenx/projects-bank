import { Inject, Injectable } from "@nestjs/common";
import { type IUserRepository, USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import * as bcrypt from 'bcrypt';
import { type ITutorRepository, TUTOR_REPOSITORY } from "src/domain/interfaces/tutor.repository";
import { CreateTutorDto } from "src/application/dtos/request/createTutor.dto";

@Injectable()
export class CreateStudentsUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,
  ) {}

  async execute(dto: CreateTutorDto){
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const existingStudent = await this.tutorRepository.findByRfc(dto.rfc);

    if (existingStudent) {
      throw new Error("El RFC ya está registrado");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.createUser({
      email: dto.email,
      passwordHash: passwordHash,
      lastName: dto.lastName,
      motherLastName: dto.motherLastName,
      name: dto.name,
    });

    const tutor = await this.tutorRepository.createTutor({
      rfc: dto.rfc,
      department: dto.department,
      user: {
        connect: { id: user.id }
      }

    });

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      motherLastName: user.motherLastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      rfc: tutor.rfc,
      department: tutor.department,
    };
  }
}