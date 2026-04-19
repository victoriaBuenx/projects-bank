using System.ComponentModel.DataAnnotations.Schema;

namespace ResidenceService.Api.Domain.entities;

public class CompanyRating
{
    public Guid Id { get; set; }

    [ForeignKey("Companie")]
    public Guid IdCompanie { get; set; }
    public Guid IdEstudiante { get; set; }

    [ForeignKey("ProjectAssignment")]
    public Guid IdProjectAssignment { get; set; }

    public int Calificacion { get; set; }
    public string? Comentario { get; set; }
    public DateTime FechaCalificacion { get; set; }

    public Companie Companie { get; set; } = null!;
    public ProjectAssignment ProjectAssignment { get; set; } = null!;
}