using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface IDeliverableRepository
{
    Task<IEnumerable<Deliverable>> GetAllAsync();
    Task<Deliverable> GetByIdAsync(Guid id);
    Task<Deliverable> CreateAsync(Deliverable entity);
    Task<Deliverable> UpdateAsync(Guid id, Deliverable entity);
    Task<bool> DeleteAsync(Guid id);
}
