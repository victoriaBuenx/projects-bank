import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { type IStudentsRepository, STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";

@Injectable()
export class GetStudentByIdUseCase {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,
  ) {}

  async execute(id: string) {
    const student = await this.studentsRepository.findById(id);
    
    if (!student) {
      throw new NotFoundException("Estudiante no encontrado");
    }

    return {
      id: student.id,
      name: student.user?.name,
      lastName: student.user?.lastName,
      motherLastName: student.user?.motherLastName,
      email: student.user?.email,
      role: student.user?.role,
      isActive: student.user?.isActive,
      controlNumber: student.controlNumber,
      career: student.career,
    };
  }
}
