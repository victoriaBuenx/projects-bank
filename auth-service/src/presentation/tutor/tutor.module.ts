import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TUTOR_REPOSITORY } from 'src/domain/interfaces/tutor.repository';
import { PrismaTutoresRepository } from 'src/infrastructure/database/repositories/prismaTutores.repository';
import { CreateTutoresUseCase } from 'src/application/use-cases/tutores/createTutores.usecase';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/database/repositories/prismaUser.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { UpdateTutoresUseCase } from 'src/application/use-cases/tutores/updateTutores.usecase';
import { GetAllTutoresUseCase } from 'src/application/use-cases/tutores/getAllTutores.usecase';
import { GetTutorByIdUseCase } from 'src/application/use-cases/tutores/getTutorById.usecase';
import { DeleteTutorUseCase } from 'src/application/use-cases/tutores/deleteTutor.usecase';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';
import { BcryptAdapter } from 'src/infrastructure/adapters/bcrypt.adapter';
import { PrismaMysqlModule } from 'src/infrastructure/database/prisma/prisma-mysql.module';

@Module({
  imports: [PrismaMysqlModule],
  controllers: [TutorController],
  providers: [
    PrismaService,
    CreateTutoresUseCase,
    UpdateTutoresUseCase,
    GetAllTutoresUseCase,
    GetTutorByIdUseCase,
    DeleteTutorUseCase,
    {
      provide: TUTOR_REPOSITORY,
      useClass: PrismaTutoresRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: HASH_SERVICE,
      useClass: BcryptAdapter
    }
  ]
})
export class TutorModule {}
