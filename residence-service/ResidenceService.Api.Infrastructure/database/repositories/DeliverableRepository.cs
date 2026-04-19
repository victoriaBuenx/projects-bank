using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class DeliverableRepository : IDeliverableRepository
{
    private readonly AppDbContext _context;

    public DeliverableRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Deliverable>> GetAllAsync()
    {
        return await _context.Deliverables.ToListAsync();
    }

    public async Task<Deliverable> GetByIdAsync(Guid id)
    {
        return await _context.Deliverables.FindAsync(id) ?? throw new KeyNotFoundException("Deliverable not found");
    }

    public async Task<Deliverable> CreateAsync(Deliverable entity)
    {
        _context.Deliverables.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Deliverable> UpdateAsync(Guid id, Deliverable entity)
    {
        var existing = await _context.Deliverables.FindAsync(id) ?? throw new KeyNotFoundException("Deliverable not found");

        existing.Nombre = entity.Nombre;
        existing.Descripcion = entity.Descripcion;
        existing.FechaLimite = entity.FechaLimite;
        existing.FormatoMuestra = entity.FormatoMuestra;
        existing.Comentarios = entity.Comentarios;
        existing.Activo = entity.Activo;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var deliverable = await _context.Deliverables.FindAsync(id) ?? throw new KeyNotFoundException("Deliverable not found");
        _context.Deliverables.Remove(deliverable);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
