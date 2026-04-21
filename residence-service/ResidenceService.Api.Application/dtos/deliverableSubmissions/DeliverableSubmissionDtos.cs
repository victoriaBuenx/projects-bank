using ResidenceService.Api.Domain.enums;

namespace ResidenceService.Api.Application.dtos.deliverableSubmissions;

public class CreateDeliverableSubmissionDto
{
    public Guid IdDeliverableAssignment { get; set; }
    public string ArchivoUrl { get; set; } = string.Empty;
}

public class GradeDeliverableSubmissionDto
{
    public int Calificacion { get; set; }
    public string? ComentarioTutor { get; set; }
    public DeliverableStatus Estado { get; set; }
}
