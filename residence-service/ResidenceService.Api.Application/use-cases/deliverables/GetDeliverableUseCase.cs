using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.deliverables;

public class GetDeliverableUseCase
{
    private readonly IDeliverableRepository _repository;

    public GetDeliverableUseCase(IDeliverableRepository repository)
    {
        _repository = repository;
    }

    public async Task<Deliverable> ExecuteAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
