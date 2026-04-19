using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.projects;

public class DeleteProjectUseCase
{
    private readonly IProjectRepository _repository;

    public DeleteProjectUseCase(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
