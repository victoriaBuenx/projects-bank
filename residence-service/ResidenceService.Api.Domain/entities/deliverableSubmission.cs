using System.ComponentModel.DataAnnotations.Schema;
using ResidenceService.Api.Domain.enums;

namespace ResidenceService.Api.Domain.entities;

public class DeliverableSubmission
{
    public Guid Id { get; set; }

    [ForeignKey("DeliverableAssignment")]
    public Guid IdDeliverableAssignment { get; set; }
    public string ArchivoUrl { get; set; } = string.Empty;
    public DateTime FechaEnvio { get; set; }
    public int? Calificacion { get; set; }
    public string? ComentarioTutor { get; set; }
    public DateTime? FechaCalificacion { get; set; }
    public DeliverableStatus Estado { get; set; } = DeliverableStatus.Pendiente;

    public DeliverableAssignment DeliverableAssignment { get; set; } = null!;
}