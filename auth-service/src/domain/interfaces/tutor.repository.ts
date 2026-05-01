import { TutorCreateInput } from "src/generated/prisma/models";
import { UpdateTutorDto } from "src/application/dtos/request/updateTutor.dto";

export interface ITutorRepository {
  findByRfc(rfc: string): any;
  createTutor(department: string, rfc: string, email: string, passwordHash: string, name: string, lastName: string, motherLastName: string): any;
  findById(id: string): any;
  findAll(): any;
  update(tutorId: string, dto: UpdateTutorDto): any;
  delete(id: string): any;
}

export const TUTOR_REPOSITORY = Symbol('ITutorRepository');