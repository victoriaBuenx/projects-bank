using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverables;

namespace ResidenceService.Api.Application.use_cases.deliverables;

public class UpdateDeliverableUseCase
{
    private readonly IDeliverableRepository _repository;

    public UpdateDeliverableUseCase(IDeliverableRepository repository)
    {
        _repository = repository;
    }

    public async Task<Deliverable> ExecuteAsync(Guid id, UpdateDeliverableDto dto)
    {
        var entity = new Deliverable
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            FechaLimite = dto.FechaLimite,
            FormatoMuestra = dto.FormatoMuestra,
            Comentarios = dto.Comentarios,
            Activo = dto.Activo
        };
        return await _repository.UpdateAsync(id, entity);
    }
}
