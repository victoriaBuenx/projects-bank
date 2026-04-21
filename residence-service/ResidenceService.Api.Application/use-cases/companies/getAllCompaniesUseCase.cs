using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Application.use_cases.companies;

public class GetAllCompaniesUseCase{
  private readonly ICompanieRepository _companieRepository;

  public GetAllCompaniesUseCase(ICompanieRepository companieRepository){
    _companieRepository = companieRepository;
  }

  public async Task<IEnumerable<Companie>> ExecuteAsync(){
    return await _companieRepository.GetAllAsync();
  }
}
