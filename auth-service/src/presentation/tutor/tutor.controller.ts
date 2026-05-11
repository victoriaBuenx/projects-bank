import { Body, Controller, Param, Post, Patch, Get, Delete, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateTutoresDto } from 'src/application/dtos/request/createTutor.dto';
import { UpdateTutorDto } from 'src/application/dtos/request/updateTutor.dto';
import { CreateTutoresUseCase } from 'src/application/use-cases/tutores/createTutores.usecase';
import { UpdateTutoresUseCase } from 'src/application/use-cases/tutores/updateTutores.usecase';
import { GetAllTutoresUseCase } from 'src/application/use-cases/tutores/getAllTutores.usecase';
import { GetTutorByIdUseCase } from 'src/application/use-cases/tutores/getTutorById.usecase';
import { DeleteTutorUseCase } from 'src/application/use-cases/tutores/deleteTutor.usecase';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tutor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class TutorController {
  constructor(
    private readonly createTutorUseCase: CreateTutoresUseCase,
    private readonly updateTutorUseCase: UpdateTutoresUseCase,
    private readonly getAllTutoresUseCase: GetAllTutoresUseCase,
    private readonly getTutorByIdUseCase: GetTutorByIdUseCase,
    private readonly deleteTutorUseCase: DeleteTutorUseCase,
  ){}

  @Throttle({short: {ttl: 60000, limit: 5}})
  @Post('register')
  async registerTutor(@Body() body: CreateTutoresDto){
    console.log("BODY:", body);
    return this.createTutorUseCase.execute(body)
  }

  @Throttle({short: {ttl: 60000, limit: 10}})
  @Patch(':id')
  async updateTutor(@Param('id') id:string, @Body() body: UpdateTutorDto){
    console.log("BODY:", body);
    return this.updateTutorUseCase.execute(id, body)
  }

  @Get()
  async getAllTutores() {
    return this.getAllTutoresUseCase.execute();
  }

  @Get(':id')
  async getTutorById(@Param('id') id: string) {
    return this.getTutorByIdUseCase.execute(id);
  }

  @Delete(':id')
  async deleteTutor(@Param('id') id: string) {
    return this.deleteTutorUseCase.execute(id);
  }
}
