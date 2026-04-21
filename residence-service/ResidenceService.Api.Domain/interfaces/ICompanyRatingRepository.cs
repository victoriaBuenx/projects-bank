using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface ICompanyRatingRepository
{
    Task<IEnumerable<CompanyRating>> GetAllAsync();
    Task<IEnumerable<CompanyRating>> GetByCompanieIdAsync(Guid companieId);
    Task<CompanyRating> CreateAsync(CompanyRating entity);
}
