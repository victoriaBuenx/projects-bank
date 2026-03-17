import { Inject, Injectable } from "@nestjs/common";
import { REFRESH_TOKEN_REPOSITORY} from "src/domain/interfaces/refreshToken.repository";
import type { RefreshTokenRepository } from "src/domain/interfaces/refreshToken.repository";

@Injectable()
export class RefreshTokenUseCase{
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY) 
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ){}

}