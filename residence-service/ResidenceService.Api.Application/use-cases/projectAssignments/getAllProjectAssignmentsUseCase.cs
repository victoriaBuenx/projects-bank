using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.projectAssignments;

public class GetAllProjectAssignmentsUseCase
{
    private readonly IProjectAssignmentRepository _repository;

    public GetAllProjectAssignmentsUseCase(IProjectAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProjectAssignment>> ExecuteAsync()
    {
        return await _repository.GetAllAsync();
    }
}
