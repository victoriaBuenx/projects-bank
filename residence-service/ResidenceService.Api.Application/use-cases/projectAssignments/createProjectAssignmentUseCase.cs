using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.projectAssignments;

namespace ResidenceService.Api.Application.use_cases.projectAssignments;

public class CreateProjectAssignmentUseCase
{
    private readonly IProjectAssignmentRepository _repository;

    public CreateProjectAssignmentUseCase(IProjectAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProjectAssignment> ExecuteAsync(CreateProjectAssignmentDto dto)
    {
        var entity = new ProjectAssignment
        {
            IdProject = dto.IdProject,
            IdEstudiante = dto.IdEstudiante,
            IdTutor = dto.IdTutor,
            Estado = dto.Estado,
            FechaAsignacion = DateTime.UtcNow
        };
        return await _repository.CreateAsync(entity);
    }
}
