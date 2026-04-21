using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Domain.interfaces;

public interface ICompanieRepository{
  Task<IEnumerable<Companie>> GetAllAsync();
  Task<Companie> GetByIdAsync(Guid id);
  Task<Companie> CreateAsync(Companie entity);
  Task<Companie> UpdateAsync(Guid id, Companie entity);
  Task<bool> DeleteAsync(Guid id);
}
