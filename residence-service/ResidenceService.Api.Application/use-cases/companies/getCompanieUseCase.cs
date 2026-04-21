using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.companies;

public class GetCompanieUseCase{
  private readonly ICompanieRepository _companieRepository;

  public GetCompanieUseCase(ICompanieRepository companieRepository){
    _companieRepository = companieRepository;
  }

  public async Task<Companie> ExecuteAsync(Guid id){
    return await _companieRepository.GetByIdAsync(id);
  }
}
