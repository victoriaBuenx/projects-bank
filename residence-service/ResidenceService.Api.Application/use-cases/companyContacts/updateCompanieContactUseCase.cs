using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Application.dtos.companyContacts;

namespace ResidenceService.Api.Application.use_cases.companyContacts;

public class UpdateCompanieContactUseCase
{
    private readonly ICompanieContactRepository _repository;

    public UpdateCompanieContactUseCase(ICompanieContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<CompanieContact> ExecuteAsync(Guid id, UpdateCompanieContactDto dto)
    {
        var entity = new CompanieContact
        {
            nombre = dto.nombre,
            apellidoPaterno = dto.apellidoPaterno,
            apellidoMaterno = dto.apellidoMaterno,
            puesto = dto.puesto,
            telefono = dto.telefono,
            correo = dto.correo,
            horarioAtencion = dto.horarioAtencion,
            notasAdicionales = dto.notasAdicionales
        };
        return await _repository.UpdateAsync(id, entity);
    }
}
