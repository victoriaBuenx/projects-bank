namespace ResidenceService.Api.Application.dtos.deliverables;

public class CreateDeliverableDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public DateTime FechaLimite { get; set; }
    public string FormatoMuestra { get; set; } = string.Empty;
    public string Comentarios { get; set; } = string.Empty;
}

public class UpdateDeliverableDto : CreateDeliverableDto
{
    public bool Activo { get; set; } = true;
}
