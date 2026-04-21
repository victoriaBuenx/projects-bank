using System.ComponentModel.DataAnnotations;

namespace ResidenceService.Api.Application.dtos.companyContacts;

public class CreateCompanieContactDto
{
    [Required]
    public Guid idCompanie { get; set; }
    [Required]
    public string nombre { get; set; } = string.Empty;
    public string apellidoPaterno { get; set; } = string.Empty;
    public string apellidoMaterno { get; set; } = string.Empty;
    public string puesto { get; set; } = string.Empty;
    public string telefono { get; set; } = string.Empty;
    public string correo { get; set; } = string.Empty;
    public string horarioAtencion { get; set; } = string.Empty;
    public string notasAdicionales { get; set; } = string.Empty;
}
