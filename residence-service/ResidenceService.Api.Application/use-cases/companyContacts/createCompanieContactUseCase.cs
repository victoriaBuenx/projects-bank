using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.companyContacts;

namespace ResidenceService.Api.Application.use_cases.companyContacts;

public class CreateCompanieContactUseCase
{
    private readonly ICompanieContactRepository _repository;

    public CreateCompanieContactUseCase(ICompanieContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<CompanieContact> ExecuteAsync(CreateCompanieContactDto dto)
    {
        var entity = new CompanieContact
        {
            idCompanie = dto.idCompanie,
            nombre = dto.nombre,
            apellidoPaterno = dto.apellidoPaterno,
            apellidoMaterno = dto.apellidoMaterno,
            puesto = dto.puesto,
            telefono = dto.telefono,
            correo = dto.correo,
            horarioAtencion = dto.horarioAtencion,
            notasAdicionales = dto.notasAdicionales
        };
        return await _repository.CreateAsync(entity);
    }
}
