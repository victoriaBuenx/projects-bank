using System.ComponentModel.DataAnnotations;

namespace ResidenceService.Api.Application.dtos.projects;

public class UpdateProjectDto
{
    [Required]
    public string nombreProyecto { get; set; } = string.Empty;
    [Required]
    public string descripcion { get; set; } = string.Empty;
    public string carreras { get; set; } = string.Empty;
    public string periodo { get; set; } = string.Empty;
    public string plazosEntrega { get; set; } = string.Empty;
    public string modalidad { get; set; } = string.Empty;
    public string tipoProyecto { get; set; } = string.Empty;
    public bool apoyoEconomico { get; set; }
    public string montoApoyo { get; set; } = string.Empty;
    public int numeroEstudiantes { get; set; } = 1;
    public string status { get; set; } = string.Empty;
    public string tecnologias { get; set; } = string.Empty;
}
