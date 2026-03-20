import { Inject, Injectable } from "@nestjs/common";
import { type IStudentsRepository, STUDENTS_REPOSITORY } from "src/domain/interfaces/students.repository";

@Injectable()
export class GetAllStudentsUseCase {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    private readonly studentsRepository: IStudentsRepository,
  ) {}

  async execute() {
    const students = await this.studentsRepository.findAll();
    return students.map(student => ({
      id: student.id,
      name: student.user?.name,
      lastName: student.user?.lastName,
      motherLastName: student.user?.motherLastName,
      email: student.user?.email,
      role: student.user?.role,
      isActive: student.user?.isActive,
      controlNumber: student.controlNumber,
      career: student.career,
    }));
  }
}
