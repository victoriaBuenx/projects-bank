import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateStudentsDto } from "src/application/dtos/request/createStudent.dto";
import { type IStudentsRepository, STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";
import { type IUserRepository, USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateStudentsUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,
  ) {}

  async execute(dto: CreateStudentsDto){
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException("El email ya está registrado");
    }

    const existingStudent = await this.studentsRepository.findByControlNumber(dto.controlNumber);

    if (existingStudent) {
      throw new ConflictException("El número de control ya está registrado");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);


    const student = await this.studentsRepository.createStudent(
      dto.career,               
      dto.controlNumber,
      dto.email,
      passwordHash,
      dto.name,
      dto.lastName,
      dto.motherLastName,
    );
    
    return {
      id: student.id,
      name: student.user.name,
      lastName: student.user.lastName,
      motherLastName: student.user.motherLastName,
      email: student.user.email,
      role: student.user.role,
      isActive: student.user.isActive,
      controlNumber: student.controlNumber,
      career: student.career,
    };
  }
}