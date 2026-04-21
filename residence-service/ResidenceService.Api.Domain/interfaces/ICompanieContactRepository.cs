using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface ICompanieContactRepository
{
    Task<IEnumerable<CompanieContact>> GetAllAsync();
    Task<IEnumerable<CompanieContact>> GetByCompanieIdAsync(Guid? companieId);
    Task<CompanieContact> GetByIdAsync(Guid id);
    Task<CompanieContact> CreateAsync(CompanieContact entity);
    Task<CompanieContact> UpdateAsync(Guid id, CompanieContact entity);
    Task<bool> DeleteAsync(Guid id);
}
