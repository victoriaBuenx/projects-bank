import { User } from "generated/prisma/browser";
import { UserCreateInput } from "generated/prisma/models";


export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(user: UserCreateInput): Promise<User>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');