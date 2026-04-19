using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.projectAssignments;

public class GetProjectAssignmentUseCase
{
    private readonly IProjectAssignmentRepository _repository;

    public GetProjectAssignmentUseCase(IProjectAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProjectAssignment> ExecuteAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
