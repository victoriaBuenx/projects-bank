using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverableAssignments;

namespace ResidenceService.Api.Application.use_cases.deliverableAssignments;

public class CreateDeliverableAssignmentUseCase
{
    private readonly IDeliverableAssignmentRepository _repository;

    public CreateDeliverableAssignmentUseCase(IDeliverableAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<DeliverableAssignment> ExecuteAsync(CreateDeliverableAssignmentDto dto)
    {
        var entity = new DeliverableAssignment
        {
            IdDeliverable = dto.IdDeliverable,
            IdProjectAssignment = dto.IdProjectAssignment,
            FechaAsignacion = DateTime.UtcNow
        };
        return await _repository.CreateAsync(entity);
    }
}
