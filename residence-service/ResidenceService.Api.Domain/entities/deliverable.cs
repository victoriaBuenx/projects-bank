namespace ResidenceService.Api.Domain.entities;

public class Deliverable
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public DateTime FechaLimite { get; set; }
    public string FormatoMuestra { get; set; } = string.Empty;
    public string Comentarios { get; set; } = string.Empty;
    public bool Activo { get; set; } = true;

    public ICollection<DeliverableAssignment> Assignments { get; set; } = new List<DeliverableAssignment>();
}