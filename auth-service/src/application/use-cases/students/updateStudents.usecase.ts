import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UpdateStudentsDto } from "src/application/dtos/request/updateStudents.dto";
import { type IStudentsRepository, STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";
import { type IUserRepository, USER_REPOSITORY } from "src/domain/interfaces/user.repository";

@Injectable()
export class UpdateStudentsUseCase{
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ){}

  async execute(id: string, dto: UpdateStudentsDto){
    const existingStudent = await this.studentsRepository.findById(id);

    if(!existingStudent){
      throw new ConflictException("El estudiante no existe")
    }

    if (dto.email) {
      const existingEmail = await this.userRepository.findByEmail(dto.email);
      if (existingEmail && existingEmail.id !== existingStudent.userId) {
        throw new ConflictException("El email ya está registrado");
      }
    }

    if (dto.controlNumber) {
      const existingControl = await this.studentsRepository.findByControlNumber(dto.controlNumber);
      if (existingControl && existingControl.id !== id) {
        throw new ConflictException("El número de control ya está registrado");
      }
    }

    const updatedStudent = await this.studentsRepository.update(id, dto);

    return {
      id: updatedStudent.id,
      name: updatedStudent.user.name,
      lastName: updatedStudent.user.lastName,
      motherLastName: updatedStudent.user.motherLastName,
      email: updatedStudent.user.email,
      role: updatedStudent.user.role,
      isActive: updatedStudent.user.isActive,
      controlNumber: updatedStudent.controlNumber,
      career: updatedStudent.career,
    };
  }
}
