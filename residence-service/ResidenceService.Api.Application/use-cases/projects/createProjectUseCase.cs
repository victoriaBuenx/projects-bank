using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.projects;

namespace ResidenceService.Api.Application.use_cases.projects;

public class CreateProjectUseCase
{
    private readonly IProjectRepository _repository;

    public CreateProjectUseCase(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<Project> ExecuteAsync(CreateProjectDto dto)
    {
        var entity = new Project
        {
            idCompanie = dto.idCompanie,
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
            status = "Abierto",
            tecnologias = dto.tecnologias,
            fechaSolicitud = DateTime.UtcNow
        };
        return await _repository.CreateAsync(entity);
    }
}
