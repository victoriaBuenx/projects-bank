using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.companyContacts;

public class DeleteCompanieContactUseCase
{
    private readonly ICompanieContactRepository _repository;

    public DeleteCompanieContactUseCase(ICompanieContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
