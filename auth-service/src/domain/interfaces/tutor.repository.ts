import { Tutor } from "generated/prisma/browser";
import { TutorCreateInput } from "generated/prisma/models";

export interface ITutorRepository {
  findByRfc(rfc: string): Promise<Tutor | null>;
  createTutor(tutor: TutorCreateInput);
  findById(id: string): Promise<Tutor | null>;
}

export const TUTOR_REPOSITORY = Symbol('ITutorRepository');