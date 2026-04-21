using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface IDeliverableAssignmentRepository
{
    Task<IEnumerable<DeliverableAssignment>> GetAllAsync();
    Task<DeliverableAssignment> GetByIdAsync(Guid id);
    Task<IEnumerable<DeliverableAssignment>> GetByProjectAssignmentIdAsync(Guid projectAssignmentId);
    Task<DeliverableAssignment> CreateAsync(DeliverableAssignment entity);
    Task<DeliverableAssignment> UpdateAsync(Guid id, DeliverableAssignment entity);
    Task<bool> DeleteAsync(Guid id);
}
