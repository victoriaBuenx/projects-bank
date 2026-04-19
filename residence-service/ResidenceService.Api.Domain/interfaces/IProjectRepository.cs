using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
    Task<IEnumerable<Project>> GetByCompanieIdAsync(Guid companieId);
    Task<Project> GetByIdAsync(Guid id);
    Task<IEnumerable<Project>> GetByStudentIdAsync(Guid studentId);
    Task<IEnumerable<Project>> GetByTutorIdAsync(Guid tutorId);
    Task<Project> CreateAsync(Project entity);
    Task<Project> UpdateAsync(Guid id, Project entity);
    Task<bool> DeleteAsync(Guid id);
}
