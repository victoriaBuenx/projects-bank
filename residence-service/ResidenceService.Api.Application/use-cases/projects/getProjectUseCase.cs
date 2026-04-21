using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.projects;

public class GetProjectUseCase
{
    private readonly IProjectRepository _repository;

    public GetProjectUseCase(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<Project> ExecuteAsync(Guid id, string? role, string? type, string? userId)
    {
        var project = await _repository.GetByIdAsync(id);

        if (role == "ADMIN" || type == "STUDENT") return project;

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            if (type == "TUTOR" && project.Assignments.Any(a => a.IdTutor == userGuid))
            {
                return project;
            }
        }

        throw new UnauthorizedAccessException("You do not have permission to view this project");
    }
}
