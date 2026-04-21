using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.deliverables;

public class GetAllDeliverablesUseCase
{
    private readonly IDeliverableRepository _repository;

    public GetAllDeliverablesUseCase(IDeliverableRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Deliverable>> ExecuteAsync()
    {
        return await _repository.GetAllAsync();
    }
}
