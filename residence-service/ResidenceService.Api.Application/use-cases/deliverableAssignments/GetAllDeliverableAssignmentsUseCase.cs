using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.deliverableAssignments;

public class GetAllDeliverableAssignmentsUseCase
{
    private readonly IDeliverableAssignmentRepository _repository;

    public GetAllDeliverableAssignmentsUseCase(IDeliverableAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<DeliverableAssignment>> ExecuteAsync(Guid? projectAssignmentId = null)
    {
        if (projectAssignmentId.HasValue)
        {
            return await _repository.GetByProjectAssignmentIdAsync(projectAssignmentId.Value);
        }
        return await _repository.GetAllAsync();
    }
}
