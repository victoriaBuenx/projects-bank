using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface IDeliverableSubmissionRepository
{
    Task<DeliverableSubmission> GetByIdAsync(Guid id);
    Task<IEnumerable<DeliverableSubmission>> GetByAssignmentIdAsync(Guid assignmentId);
    Task<DeliverableSubmission> CreateAsync(DeliverableSubmission entity);
    Task<DeliverableSubmission> UpdateAsync(Guid id, DeliverableSubmission entity);
}
