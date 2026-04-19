using System.ComponentModel.DataAnnotations;

namespace ResidenceService.Api.Application.dtos.projectAssignments;

public class UpdateProjectAssignmentDto
{
    public DateTime? FechaFinalizacion { get; set; }
    [Required]
    public string Estado { get; set; } = string.Empty;
}
