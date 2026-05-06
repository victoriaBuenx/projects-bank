import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/user.repository";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "src/generated/prisma/browser";
import { UserCreateInput } from "src/generated/prisma/models";


@Injectable()
export class PrismaUserRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) : Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id},
    });
  }

  async createUser(user: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: user.email,
        passwordHash: user.passwordHash,
        role: 'ADMIN',
        lastName: user.lastName,
        motherLastName: user.motherLastName,
        name: user.name,
      }
    });
  }

}