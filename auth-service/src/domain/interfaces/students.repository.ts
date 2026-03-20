import { Student } from "generated/prisma/browser";
import { UpdateStudentsDto } from "src/application/dtos/request/updateStudents.dto";

export interface IStudentsRepository {
  findByControlNumber(controlNumber: string): Promise<Student | null>;
  createStudent(career: string, controlNumber:string, email:string, passwordHash:string, name:string, lastName:string, motherLastName:string);
  findById(id: string): Promise<Student | null>;
  update(studentId: string, dto: UpdateStudentsDto);
}

export const STUDENTS_REPOSITORY = Symbol('IStudentsRepository');