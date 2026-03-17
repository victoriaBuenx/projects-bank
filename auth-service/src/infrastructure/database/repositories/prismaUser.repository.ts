import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/interfaces/user.repository";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class PrismaUserRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) : Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if(!user) return null;

    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.isActive,
      user.role,
    );
  }
 
  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        role: user.role,
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id},
    });

    if(!user) return null;
      
    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.isActive,
      user.role,
    );
  }

}