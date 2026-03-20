import { Injectable } from "@nestjs/common";
import { IStudentsRepository } from "src/domain/interfaces/students.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Student } from "generated/prisma/browser";
import { UpdateStudentsDto } from "src/application/dtos/request/updateStudents.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaStudentsRepository implements IStudentsRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  findById(id: string) {
      return this.prisma.student.findUnique({
        where: { id },
        include: { user: true },
      });
  }

  findAll() {
      return this.prisma.student.findMany({
        include: { user: true },
      });
  }

  delete(id: string) {
      return this.prisma.student.delete({
        where: { id },
        include: { user: true },
      });
  }

  findByControlNumber(controlNumber: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { controlNumber },
    });
  }

  async createStudent(
    career: string, 
    controlNumber:string, 
    email:string,
    passwordHash:string,
    name:string,
    lastName:string,
    motherLastName:string, 
  ){
    return this.prisma.student.create({
      data: {
        career: career,
        controlNumber: controlNumber,
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
    });
  } 

  async update(id: string, dto: UpdateStudentsDto) {
    const passwordHash = dto.password
    ? await bcrypt.hash(dto.password, 10)
    : undefined;

    return this.prisma.student.update({
      where: {id},
      data: {
        career: dto.career,
        controlNumber: dto.controlNumber,
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