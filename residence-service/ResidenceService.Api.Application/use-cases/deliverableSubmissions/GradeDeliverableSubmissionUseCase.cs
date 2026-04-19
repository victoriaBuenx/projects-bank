using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverableSubmissions;

namespace ResidenceService.Api.Application.use_cases.deliverableSubmissions;

public class GradeDeliverableSubmissionUseCase
{
    private readonly IDeliverableSubmissionRepository _repository;

    public GradeDeliverableSubmissionUseCase(IDeliverableSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<DeliverableSubmission> ExecuteAsync(Guid id, GradeDeliverableSubmissionDto dto)
    {
        var entity = new DeliverableSubmission
        {
            Calificacion = dto.Calificacion,
            ComentarioTutor = dto.ComentarioTutor,
            Estado = dto.Estado,
            FechaCalificacion = DateTime.UtcNow
        };
        return await _repository.UpdateAsync(id, entity);
    }
}
