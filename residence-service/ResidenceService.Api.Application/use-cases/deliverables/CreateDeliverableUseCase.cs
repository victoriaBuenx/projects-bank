using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverables;

namespace ResidenceService.Api.Application.use_cases.deliverables;

public class CreateDeliverableUseCase
{
    private readonly IDeliverableRepository _repository;

    public CreateDeliverableUseCase(IDeliverableRepository repository)
    {
        _repository = repository;
    }

    public async Task<Deliverable> ExecuteAsync(CreateDeliverableDto dto)
    {
        var entity = new Deliverable
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            FechaLimite = dto.FechaLimite,
            FormatoMuestra = dto.FormatoMuestra,
            Comentarios = dto.Comentarios,
            Activo = true
        };
        return await _repository.CreateAsync(entity);
    }
}
