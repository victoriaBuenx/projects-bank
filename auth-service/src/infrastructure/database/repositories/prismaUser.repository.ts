import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/user.repository";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaMysqlService } from "../prisma/prisma-mysql.service";
import { User } from "src/generated/prisma/browser";
import { UserCreateInput } from "src/generated/prisma/models";


@Injectable()
export class PrismaUserRepository implements IUserRepository {

  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaMysql: PrismaMysqlService,
  ) {}

  async findByEmail(email: string) : Promise<User | null> {
    return await this.prismaMysql.user.findUnique({
      where: { email },
    }) as User | null;
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaMysql.user.findUnique({
      where: { id},
    }) as User | null;
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

  async findAll(): Promise<User[]> {
    return await this.prismaMysql.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        motherLastName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    }) as User[];
  }

}