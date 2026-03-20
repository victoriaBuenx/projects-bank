import { Body, Controller, Param, Post, Patch } from '@nestjs/common';
import { CreateStudentsDto } from 'src/application/dtos/request/createStudent.dto';
import { UpdateStudentsDto } from 'src/application/dtos/request/updateStudents.dto';
import { CreateStudentsUseCase } from 'src/application/use-cases/students/createStudents.usecase';
import { UpdateStudentsUseCase } from 'src/application/use-cases/students/updateStudents.usecase';

@Controller('student')
export class StudentController {
  constructor(
    private readonly createStudentUseCase: CreateStudentsUseCase,
    private readonly updateStudentUseCase: UpdateStudentsUseCase,
  ){}

  @Post('register')
  async registerStudent(@Body() body: CreateStudentsDto){
    console.log("BODY:", body);
    return this.createStudentUseCase.execute(body)
  }

  @Patch(':id')
  async updateStudent(@Param('id') id:string, @Body() body: UpdateStudentsDto){
    console.log("BODY:", body);
    return this.updateStudentUseCase.execute(id, body)
  }
  
}
