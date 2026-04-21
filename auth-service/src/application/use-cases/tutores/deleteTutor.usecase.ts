import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { type ITutorRepository, TUTOR_REPOSITORY } from "src/domain/interfaces/tutor.repository";

@Injectable()
export class DeleteTutorUseCase {
  constructor(
    @Inject(TUTOR_REPOSITORY)
    private readonly tutorRepository: ITutorRepository,
  ) {}

  async execute(id: string) {
    const existingTutor = await this.tutorRepository.findById(id);
    
    if (!existingTutor) {
      throw new NotFoundException("Tutor no encontrado");
    }

    const tutor = await this.tutorRepository.delete(id);

    return {
      id: tutor.id,
      name: tutor.user?.name,
      lastName: tutor.user?.lastName,
      motherLastName: tutor.user?.motherLastName,
      email: tutor.user?.email,
      role: tutor.user?.role,
      isActive: tutor.user?.isActive,
      rfc: tutor.rfc,
      department: tutor.department,
    };
  }
}
