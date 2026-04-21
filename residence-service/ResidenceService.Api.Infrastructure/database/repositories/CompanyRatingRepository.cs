using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class CompanyRatingRepository : ICompanyRatingRepository
{
    private readonly AppDbContext _context;

    public CompanyRatingRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CompanyRating>> GetAllAsync()
    {
        return await _context.CompanyRatings
            .Include(cr => cr.Companie)
            .ToListAsync();
    }

    public async Task<IEnumerable<CompanyRating>> GetByCompanieIdAsync(Guid companieId)
    {
        return await _context.CompanyRatings
            .Where(cr => cr.IdCompanie == companieId)
            .ToListAsync();
    }

    public async Task<CompanyRating> CreateAsync(CompanyRating entity)
    {
        _context.CompanyRatings.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
}
