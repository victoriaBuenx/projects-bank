using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.deliverables;

public class DeleteDeliverableUseCase
{
    private readonly IDeliverableRepository _repository;

    public DeleteDeliverableUseCase(IDeliverableRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
