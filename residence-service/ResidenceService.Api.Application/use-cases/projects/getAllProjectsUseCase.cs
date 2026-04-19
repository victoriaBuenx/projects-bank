using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.projects;

public class GetAllProjectsUseCase
{
    private readonly IProjectRepository _repository;

    public GetAllProjectsUseCase(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Project>> ExecuteAsync(string? role, string? type, string? userId)
    {
        // Admins and Students can see all projects
        if (role == "ADMIN" || type == "STUDENT")
        {
            return await _repository.GetAllAsync();
        }

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            if (type == "TUTOR")
            {
                return await _repository.GetByTutorIdAsync(userGuid);
            }
        }

        return Enumerable.Empty<Project>();
    }
}
