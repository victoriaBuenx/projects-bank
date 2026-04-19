using ResidenceService.Api.Domain.interfaces;

namespace ResidenceService.Api.Application.use_cases.companies;

public class DeleteCompanieUseCase{
  private readonly ICompanieRepository _companieRepository;

  public DeleteCompanieUseCase(ICompanieRepository companieRepository){
    _companieRepository = companieRepository;
  }

  public async Task<bool> ExecuteAsync(Guid id){
    return await _companieRepository.DeleteAsync(id);
  }
}
