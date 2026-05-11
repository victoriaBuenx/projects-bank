import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import type { IUserRepository } from "src/domain/interfaces/user.repository";

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
