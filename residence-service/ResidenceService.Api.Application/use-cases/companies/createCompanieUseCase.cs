using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.companies;

namespace ResidenceService.Api.Application.use_cases.companies;

public class CreateCompanieUseCase{
  private readonly ICompanieRepository _companieRepository;

  public CreateCompanieUseCase(ICompanieRepository companieRepository){
    _companieRepository = companieRepository;
  }

    public async Task<Companie> ExecuteAsync(CreateCompanieDto dto)
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
            convenio = dto.convenio,
            fechaRegistro = DateTime.UtcNow
        };
        return await _companieRepository.CreateAsync(entity);
    }
}
