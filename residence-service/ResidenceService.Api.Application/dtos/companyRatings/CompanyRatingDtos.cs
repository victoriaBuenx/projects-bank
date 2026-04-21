namespace ResidenceService.Api.Application.dtos.companyRatings;

public class CreateCompanyRatingDto
{
    public Guid IdCompanie { get; set; }
    public Guid IdProjectAssignment { get; set; }
    public int Calificacion { get; set; }
    public string? Comentario { get; set; }
}
