import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ITutorRepository } from "src/domain/interfaces/tutor.repository";
import { TutorCreateInput } from "generated/prisma/models";
import { UpdateTutorDto } from "src/application/dtos/request/updateTutor.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaTutoresRepository implements ITutorRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  findByRfc(rfc: string) {
    return this.prisma.tutor.findUnique({
      where: { rfc },
    });
  }

  async createTutor(
    department: string,
    rfc: string,
    email: string,
    passwordHash: string,
    name: string,
    lastName: string,
    motherLastName: string
  ) {
      return this.prisma.tutor.create({
        data: {
          department: department,
          rfc: rfc,
          user: {
            create: {
              email: email,
              passwordHash: passwordHash,
              name: name,
              lastName: lastName,
              motherLastName: motherLastName
            }
          }
        },
        include: { user: true },
      })
  }

  findById(id: string) {
      return this.prisma.tutor.findUnique({
        where: {id},
        include: { user: true },
      })
  }

  findAll() {
      return this.prisma.tutor.findMany({
        include: { user: true },
      });
  }

  delete(id: string) {
      return this.prisma.tutor.delete({
        where: { id },
        include: { user: true },
      });
  }

  async update(id: string, dto: UpdateTutorDto) {
    const passwordHash = dto.password
    ? await bcrypt.hash(dto.password, 10)
    : undefined;

    return this.prisma.tutor.update({
      where: {id},
      data: {
        department: dto.department,
        rfc: dto.rfc,
        user:{
          update:{
            email: dto.email,
            name: dto.name,
            lastName: dto.lastName,
            motherLastName: dto.motherLastName,
            ...(passwordHash && { passwordHash }), 
          }
        }
      },
      include: { user: true },
    });
  }
}