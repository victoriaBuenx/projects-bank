import { Inject, Injectable } from "@nestjs/common";
import { type ITutorRepository, TUTOR_REPOSITORY } from "src/domain/interfaces/tutor.repository";

@Injectable()
export class GetAllTutoresUseCase {
  constructor(
    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,
  ) {}

  async execute() {
    const tutores = await this.tutorRepository.findAll();
    return tutores.map(tutor => ({
      id: tutor.id,
      name: tutor.user?.name,
      lastName: tutor.user?.lastName,
      motherLastName: tutor.user?.motherLastName,
      email: tutor.user?.email,
      role: tutor.user?.role,
      isActive: tutor.user?.isActive,
      rfc: tutor.rfc,
      department: tutor.department,
    }));
  }
}
