import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UpdateTutorDto } from "src/application/dtos/request/updateTutor.dto";
import { type ITutorRepository, TUTOR_REPOSITORY } from "src/domain/interfaces/tutor.repository";
import { type IUserRepository, USER_REPOSITORY } from "src/domain/interfaces/user.repository";

@Injectable()
export class UpdateTutoresUseCase{
  constructor(
    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ){}

  async execute(id: string, dto: UpdateTutorDto){
    const existingTutor = await this.tutorRepository.findById(id);

    if(!existingTutor){
      throw new ConflictException("El tutor no existe");
    }

    if (dto.email) {
      const existingEmail = await this.userRepository.findByEmail(dto.email);
      if (existingEmail && existingEmail.id !== existingTutor.userId) {
        throw new ConflictException("El email ya está registrado");
      }
    }

    if (dto.rfc) {
      const existingRfc = await this.tutorRepository.findByRfc(dto.rfc);
      if (existingRfc && existingRfc.id !== id) {
        throw new ConflictException("El RFC ya está registrado");
      }
    }

    const updatedTutor = await this.tutorRepository.update(id, dto);

    return {
      id: updatedTutor.id,
      name: updatedTutor.user?.name,
      lastName: updatedTutor.user?.lastName,
      motherLastName: updatedTutor.user?.motherLastName,
      email: updatedTutor.user?.email,
      role: updatedTutor.user?.role,
      isActive: updatedTutor.user?.isActive,
      rfc: updatedTutor.rfc,
      department: updatedTutor.department,
    };
  }
}
