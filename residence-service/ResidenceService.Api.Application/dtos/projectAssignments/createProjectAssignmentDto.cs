using System.ComponentModel.DataAnnotations;

namespace ResidenceService.Api.Application.dtos.projectAssignments;

public class CreateProjectAssignmentDto
{
    [Required]
    public Guid IdProject { get; set; }
    [Required]
    public Guid IdEstudiante { get; set; }
    [Required]
    public Guid IdTutor { get; set; }
    public string Estado { get; set; } = "Pendiente";
}
