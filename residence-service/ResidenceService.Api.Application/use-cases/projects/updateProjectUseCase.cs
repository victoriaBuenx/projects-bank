using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.projects;

namespace ResidenceService.Api.Application.use_cases.projects;

public class UpdateProjectUseCase
{
    private readonly IProjectRepository _repository;

    public UpdateProjectUseCase(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<Project> ExecuteAsync(Guid id, UpdateProjectDto dto)
    {
        var entity = new Project
        {
            nombreProyecto = dto.nombreProyecto,
            descripcion = dto.descripcion,
            carreras = dto.carreras,
            periodo = dto.periodo,
            plazosEntrega = dto.plazosEntrega,
            modalidad = dto.modalidad,
            tipoProyecto = dto.tipoProyecto,
            apoyoEconomico = dto.apoyoEconomico,
            montoApoyo = dto.montoApoyo,
            numeroEstudiantes = dto.numeroEstudiantes,
            status = dto.status,
            tecnologias = dto.tecnologias
        };
        return await _repository.UpdateAsync(id, entity);
    }
}
