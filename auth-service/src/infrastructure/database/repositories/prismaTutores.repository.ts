import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ITutorRepository } from "src/domain/interfaces/tutor.repository";
import { Tutor } from "generated/prisma/browser";
import { TutorCreateInput } from "generated/prisma/models";

@Injectable()
export class PrismaTutoresRepository implements ITutorRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  findByRfc(rfc: string): Promise<Tutor | null> {
    return this.prisma.tutor.findUnique({
      where: { rfc },
    });
  }

  createTutor(tutor: TutorCreateInput): Promise<Tutor> {
      return this.prisma.tutor.create({
        data: {
          department: tutor.department,
          rfc: tutor.rfc,
          user: { connect: {id: tutor.id}}
        }
      })
  }

  findById(id: string): Promise<Tutor | null> {
      return this.prisma.tutor.findUnique({
        where: {id},
      })
  }
}