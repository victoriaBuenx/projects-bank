using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.companyRatings;

public class GetAllCompanyRatingsUseCase
{
    private readonly ICompanyRatingRepository _repository;

    public GetAllCompanyRatingsUseCase(ICompanyRatingRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CompanyRating>> ExecuteAsync(Guid? companieId = null)
    {
        if (companieId.HasValue)
        {
            return await _repository.GetByCompanieIdAsync(companieId.Value);
        }
        return await _repository.GetAllAsync();
    }
}
