import { Body, Controller, Param, Post, Patch, Get, Delete, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateStudentsDto } from 'src/application/dtos/request/createStudent.dto';
import { UpdateStudentsDto } from 'src/application/dtos/request/updateStudents.dto';
import { CreateStudentsUseCase } from 'src/application/use-cases/students/createStudents.usecase';
import { UpdateStudentsUseCase } from 'src/application/use-cases/students/updateStudents.usecase';
import { GetAllStudentsUseCase } from 'src/application/use-cases/students/getAllStudents.usecase';
import { GetStudentByIdUseCase } from 'src/application/use-cases/students/getStudentById.usecase';
import { DeleteStudentUseCase } from 'src/application/use-cases/students/deleteStudent.usecase';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class StudentController {
  constructor(
    private readonly createStudentUseCase: CreateStudentsUseCase,
    private readonly updateStudentUseCase: UpdateStudentsUseCase,
    private readonly getAllStudentsUseCase: GetAllStudentsUseCase,
    private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
  ){}

  @Throttle({short: {ttl: 60000, limit: 5}})
  @Post('register')
  async registerStudent(@Body() body: CreateStudentsDto){
    console.log("BODY:", body);
    return this.createStudentUseCase.execute(body)
  }

  @Throttle({short: {ttl: 60000, limit: 10}})
  @Patch(':id')
  async updateStudent(@Param('id') id:string, @Body() body: UpdateStudentsDto){
    console.log("BODY:", body);
    return this.updateStudentUseCase.execute(id, body)
  }

  @Get()
  async getAllStudents() {
    return this.getAllStudentsUseCase.execute();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return this.getStudentByIdUseCase.execute(id);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.deleteStudentUseCase.execute(id);
  }
}
