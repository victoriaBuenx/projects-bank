using System.ComponentModel.DataAnnotations.Schema;

namespace ResidenceService.Api.Domain.entities;

public class DeliverableAssignment
{
    public Guid Id { get; set; }

    [ForeignKey("Deliverable")]
    public Guid IdDeliverable { get; set; }

    [ForeignKey("ProjectAssignment")]
    public Guid IdProjectAssignment { get; set; }
    public DateTime FechaAsignacion { get; set; }

    public Deliverable Deliverable { get; set; } = null!;
    public ProjectAssignment ProjectAssignment { get; set; } = null!;
    public ICollection<DeliverableSubmission> Submissions { get; set; } = new List<DeliverableSubmission>();
}