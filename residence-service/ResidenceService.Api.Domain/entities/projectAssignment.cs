using System.ComponentModel.DataAnnotations.Schema;

namespace ResidenceService.Api.Domain.entities;

public class ProjectAssignment
{
    public Guid Id { get; set; }

    [ForeignKey("Project")]
    public Guid IdProject { get; set; }
    public Guid IdEstudiante { get; set; }
    public Guid IdTutor { get; set; }
    public DateTime FechaAsignacion { get; set; } = DateTime.Now;
    public DateTime? FechaFinalizacion { get; set; }
    public string Estado { get; set; } = string.Empty;

    public Project Project { get; set; } = null!;
}