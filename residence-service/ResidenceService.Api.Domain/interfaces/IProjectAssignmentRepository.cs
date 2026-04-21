using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface IProjectAssignmentRepository
{
    Task<IEnumerable<ProjectAssignment>> GetAllAsync();
    Task<IEnumerable<ProjectAssignment>> GetByProjectIdAsync(Guid projectId);
    Task<ProjectAssignment> GetByIdAsync(Guid id);
    Task<ProjectAssignment> CreateAsync(ProjectAssignment entity);
    Task<ProjectAssignment> UpdateAsync(Guid id, ProjectAssignment entity);
    Task<bool> DeleteAsync(Guid id);
}
