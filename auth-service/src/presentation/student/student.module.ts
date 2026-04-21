import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { STUDENTS_REPOSITORY } from 'src/domain/interfaces/students.repository';
import { PrismaStudentsRepository } from 'src/infrastructure/database/repositories/prismaStudents.repository';
import { CreateStudentsUseCase } from 'src/application/use-cases/students/createStudents.usecase';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/database/repositories/prismaUser.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { HASH_SERVICE } from 'src/domain/interfaces/hash.service';
import { BcryptAdapter } from 'src/infrastructure/adapters/bcrypt.adapter';
import { UpdateStudentsDto } from 'src/application/dtos/request/updateStudents.dto';
import { UpdateStudentsUseCase } from 'src/application/use-cases/students/updateStudents.usecase';
import { GetAllStudentsUseCase } from 'src/application/use-cases/students/getAllStudents.usecase';
import { GetStudentByIdUseCase } from 'src/application/use-cases/students/getStudentById.usecase';
import { DeleteStudentUseCase } from 'src/application/use-cases/students/deleteStudent.usecase';

@Module({
  controllers: [StudentController],
  providers: [
    PrismaService,
    CreateStudentsUseCase,
    UpdateStudentsUseCase,
    GetAllStudentsUseCase,
    GetStudentByIdUseCase,
    DeleteStudentUseCase,
    {
      provide: STUDENTS_REPOSITORY,
      useClass: PrismaStudentsRepository,
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
export class StudentModule {}
