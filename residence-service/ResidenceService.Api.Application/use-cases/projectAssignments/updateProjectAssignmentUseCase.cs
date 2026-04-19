using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.projectAssignments;

namespace ResidenceService.Api.Application.use_cases.projectAssignments;

public class UpdateProjectAssignmentUseCase
{
    private readonly IProjectAssignmentRepository _repository;

    public UpdateProjectAssignmentUseCase(IProjectAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProjectAssignment> ExecuteAsync(Guid id, UpdateProjectAssignmentDto dto)
    {
        var entity = new ProjectAssignment
        {
            Estado = dto.Estado,
            FechaFinalizacion = dto.FechaFinalizacion
        };
        return await _repository.UpdateAsync(id, entity);
    }
}
