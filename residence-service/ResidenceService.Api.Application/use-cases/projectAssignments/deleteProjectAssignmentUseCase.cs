using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.projectAssignments;

public class DeleteProjectAssignmentUseCase
{
    private readonly IProjectAssignmentRepository _repository;

    public DeleteProjectAssignmentUseCase(IProjectAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
