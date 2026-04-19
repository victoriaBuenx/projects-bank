using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.companyContacts;

public class GetCompanieContactUseCase
{
    private readonly ICompanieContactRepository _repository;

    public GetCompanieContactUseCase(ICompanieContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<CompanieContact> ExecuteAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
