import { Student } from "generated/prisma/browser";
import { UpdateStudentsDto } from "src/application/dtos/request/updateStudents.dto";

export interface IStudentsRepository {
  findByControlNumber(controlNumber: string): Promise<Student | null>;
  createStudent(career: string, controlNumber:string, email:string, passwordHash:string, name:string, lastName:string, motherLastName:string): any;
  findById(id: string): any;
  findAll(): any;
  update(studentId: string, dto: UpdateStudentsDto): any;
  delete(id: string): any;
}

export const STUDENTS_REPOSITORY = Symbol('IStudentsRepository');