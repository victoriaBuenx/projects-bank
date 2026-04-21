import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "src/application/dtos/request/refreshToken.dto";
import { RefreshTokenResponseDto } from "src/application/dtos/response/refreshTokenResponse.dto";
import { REFRESH_TOKEN_REPOSITORY} from "src/domain/interfaces/refreshToken.repository";
import type { IRefreshTokenRepository } from "src/domain/interfaces/refreshToken.repository";
import { USER_REPOSITORY } from "src/domain/interfaces/user.repository";
import type { IUserRepository} from "src/domain/interfaces/user.repository";



@Injectable()
export class RefreshTokenUseCase{
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY) 
    private readonly refreshTokenRepository: IRefreshTokenRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    private readonly jwtService: JwtService,
    
  ){}

  async execute(dto: RefreshTokenDto) : Promise <RefreshTokenResponseDto>{
    const refreshToken = await this.refreshTokenRepository.findByToken(dto.refreshToken);

    if(!refreshToken){
      throw new ConflictException('Token invalido')
    }

    const user = await this.userRepository.findById(refreshToken.userId);
    if (!user){
      throw new ConflictException('Usuario no encontrado')
    }

    if(!user.isActive){
      throw new ConflictException('Cuenta inactiva')
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {accessToken}
  }

}