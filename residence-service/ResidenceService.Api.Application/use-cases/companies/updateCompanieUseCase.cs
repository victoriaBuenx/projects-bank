using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.companies;

namespace ResidenceService.Api.Application.use_cases.companies;

public class UpdateCompanieUseCase{
  private readonly ICompanieRepository _companieRepository;

  public UpdateCompanieUseCase(ICompanieRepository companieRepository){
    _companieRepository = companieRepository;
  }

    public async Task<Companie> ExecuteAsync(Guid id, UpdateCompanieDto dto)
    {
        var entity = new Companie
        {
            nombreEmpresa = dto.nombreEmpresa,
            rfc = dto.rfc,
            descripcion = dto.descripcion,
            giro = dto.giro,
            sector = dto.sector,
            tamañoEmpresa = dto.tamañoEmpresa,
            direccion = dto.direccion,
            ciudad = dto.ciudad,
            estado = dto.estado,
            pais = dto.pais,
            cp = dto.cp,
            telefono = dto.telefono,
            convenio = dto.convenio
        };
        return await _companieRepository.UpdateAsync(id, entity);
    }
}
