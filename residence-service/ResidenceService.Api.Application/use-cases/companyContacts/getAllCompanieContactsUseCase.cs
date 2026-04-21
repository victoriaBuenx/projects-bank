using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.companyContacts;

public class GetAllCompanieContactsUseCase
{
    private readonly ICompanieContactRepository _repository;

    public GetAllCompanieContactsUseCase(ICompanieContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CompanieContact>> ExecuteAsync(Guid? companieId = null)
    {
        if (companieId.HasValue)
        {
            return await _repository.GetByCompanieIdAsync(companieId.Value);
        }
        return await _repository.GetAllAsync();
    }
}
