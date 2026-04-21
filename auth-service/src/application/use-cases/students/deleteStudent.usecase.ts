import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { type IStudentsRepository, STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";

@Injectable()
export class DeleteStudentUseCase {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,
  ) {}

  async execute(id: string) {
    const existingStudent = await this.studentsRepository.findById(id);
    
    if (!existingStudent) {
      throw new NotFoundException("Estudiante no encontrado");
    }

    const student = await this.studentsRepository.delete(id);

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
