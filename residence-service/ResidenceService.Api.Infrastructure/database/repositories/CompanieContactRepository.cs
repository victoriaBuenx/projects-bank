using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class CompanieContactRepository : ICompanieContactRepository
{
    private readonly AppDbContext _context;

    public CompanieContactRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CompanieContact>> GetAllAsync()
    {
        return await _context.CompanieContacts.ToListAsync();
    }

    public async Task<IEnumerable<CompanieContact>> GetByCompanieIdAsync(Guid? companieId)
    {
        return await _context.CompanieContacts
            .Where(c => c.idCompanie == companieId)
            .ToListAsync();
    }

    public async Task<CompanieContact> GetByIdAsync(Guid id)
    {
        return await _context.CompanieContacts
            .FirstOrDefaultAsync(c => c.id == id) ?? throw new KeyNotFoundException("CompanieContact not found");
    }

    public async Task<CompanieContact> CreateAsync(CompanieContact entity)
    {
        _context.CompanieContacts.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<CompanieContact> UpdateAsync(Guid id, CompanieContact entity)
    {
        var existing = await _context.CompanieContacts.FindAsync(id) ?? throw new KeyNotFoundException("Companie contact not found");

        existing.nombre = entity.nombre;
        existing.apellidoPaterno = entity.apellidoPaterno;
        existing.apellidoMaterno = entity.apellidoMaterno;
        existing.puesto = entity.puesto;
        existing.correo = entity.correo;
        existing.telefono = entity.telefono;
        existing.horarioAtencion = entity.horarioAtencion;
        existing.notasAdicionales = entity.notasAdicionales;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var contact = await _context.CompanieContacts.FindAsync(id) ?? throw new KeyNotFoundException("CompanieContact not found");

        _context.CompanieContacts.Remove(contact);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
