using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companyRatings;

namespace ResidenceService.Api.Application.use_cases.companyRatings;

public class CreateCompanyRatingUseCase
{
    private readonly ICompanyRatingRepository _repository;
    private readonly ICompanieRepository _companieRepository;

    public CreateCompanyRatingUseCase(ICompanyRatingRepository repository, ICompanieRepository companieRepository)
    {
        _repository = repository;
        _companieRepository = companieRepository;
    }

    public async Task<CompanyRating> ExecuteAsync(CreateCompanyRatingDto dto, Guid studentId)
    {
        var entity = new CompanyRating
        {
            IdCompanie = dto.IdCompanie,
            IdProjectAssignment = dto.IdProjectAssignment,
            IdEstudiante = studentId,
            Calificacion = dto.Calificacion,
            Comentario = dto.Comentario,
            FechaCalificacion = DateTime.UtcNow
        };

        var result = await _repository.CreateAsync(entity);

        // Update company average rating
        await UpdateCompanyRatingAsync(dto.IdCompanie);

        return result;
    }

    private async Task UpdateCompanyRatingAsync(Guid companieId)
    {
        var ratings = await _repository.GetByCompanieIdAsync(companieId);
        if (ratings.Any())
        {
            double average = ratings.Average(r => r.Calificacion);
            var companie = await _companieRepository.GetByIdAsync(companieId);
            companie.calificacion = (int)Math.Round(average);
            await _companieRepository.UpdateAsync(companieId, companie);
        }
    }
}
