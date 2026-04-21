import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { REFRESH_TOKEN_REPOSITORY } from "src/domain/interfaces/refreshToken.repository";
import type { IRefreshTokenRepository } from "src/domain/interfaces/refreshToken.repository";
import { LogoutDto } from "../dtos/request/logout.dto";
import { LogoutResponseDto } from "../dtos/response/logoutResponse.dto";
import { USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import type { IUserRepository } from "src/domain/interfaces/user.repository";

@Injectable()
export class LogoutUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute (dto: LogoutDto): Promise<LogoutResponseDto> {
    const user = await this.userRepository.findById(dto.userId)

    if(!user){
      throw new ConflictException ('Usuario no encontrado')
    }

    await this.refreshTokenRepository.revokeByUserId(dto.userId);

    return {message: 'Sesión cerrada correctamente' };
  }
}