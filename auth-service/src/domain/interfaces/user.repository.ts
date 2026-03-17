import { User } from "../entities/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  findById(id: string, email: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');