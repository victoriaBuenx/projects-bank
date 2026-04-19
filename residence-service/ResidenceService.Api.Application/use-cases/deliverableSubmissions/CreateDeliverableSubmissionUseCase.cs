using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverableSubmissions;

namespace ResidenceService.Api.Application.use_cases.deliverableSubmissions;

public class CreateDeliverableSubmissionUseCase
{
    private readonly IDeliverableSubmissionRepository _repository;

    public CreateDeliverableSubmissionUseCase(IDeliverableSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<DeliverableSubmission> ExecuteAsync(CreateDeliverableSubmissionDto dto)
    {
        var entity = new DeliverableSubmission
        {
            IdDeliverableAssignment = dto.IdDeliverableAssignment,
            ArchivoUrl = dto.ArchivoUrl,
            FechaEnvio = DateTime.UtcNow,
            Estado = ResidenceService.Api.Domain.enums.DeliverableStatus.Enviado
        };
        return await _repository.CreateAsync(entity);
    }
}
