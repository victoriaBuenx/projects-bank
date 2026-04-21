using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class CompanieRepository : ICompanieRepository
{
    private readonly AppDbContext _context;

    public CompanieRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Companie>> GetAllAsync()
    {
        return await _context.Companies
            .Include(c => c.Contacts)
            .Include(c => c.Projects)
            .ToListAsync();
    }

    public async Task<Companie> GetByIdAsync(Guid id)
    {
        return await _context.Companies
            .Include(c => c.Contacts)
            .Include(c => c.Projects)
            .FirstOrDefaultAsync(c => c.id == id) ?? throw new KeyNotFoundException("Companie not found");
    }

    public async Task<Companie> CreateAsync(Companie entity)
    {
        _context.Companies.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Companie> UpdateAsync(Guid id, Companie entity)
    {
        var existing = await _context.Companies.FindAsync(id) ?? throw new KeyNotFoundException("Companie not found");

        existing.nombreEmpresa = entity.nombreEmpresa;
        existing.rfc = entity.rfc;
        existing.descripcion = entity.descripcion;
        existing.giro = entity.giro;
        existing.sector = entity.sector;
        existing.tamañoEmpresa = entity.tamañoEmpresa;
        existing.direccion = entity.direccion;
        existing.ciudad = entity.ciudad;
        existing.estado = entity.estado;
        existing.pais = entity.pais;
        existing.cp = entity.cp;
        existing.telefono = entity.telefono;
        existing.convenio = entity.convenio;
        existing.calificacion = entity.calificacion;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var companie = await _context.Companies.FindAsync(id) ?? throw new KeyNotFoundException("Companie not found");

        _context.Companies.Remove(companie);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
