using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class DeliverableSubmissionRepository : IDeliverableSubmissionRepository
{
    private readonly AppDbContext _context;

    public DeliverableSubmissionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DeliverableSubmission> GetByIdAsync(Guid id)
    {
        return await _context.DeliverableSubmissions
            .FirstOrDefaultAsync(ds => ds.Id == id) ?? throw new KeyNotFoundException("Submission not found");
    }

    public async Task<IEnumerable<DeliverableSubmission>> GetByAssignmentIdAsync(Guid assignmentId)
    {
        return await _context.DeliverableSubmissions
            .Where(ds => ds.IdDeliverableAssignment == assignmentId)
            .ToListAsync();
    }

    public async Task<DeliverableSubmission> CreateAsync(DeliverableSubmission entity)
    {
        _context.DeliverableSubmissions.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<DeliverableSubmission> UpdateAsync(Guid id, DeliverableSubmission entity)
    {
        var existing = await _context.DeliverableSubmissions.FindAsync(id) ?? throw new KeyNotFoundException("Submission not found");
        
        existing.Calificacion = entity.Calificacion;
        existing.ComentarioTutor = entity.ComentarioTutor;
        existing.FechaCalificacion = entity.FechaCalificacion;
        existing.Estado = entity.Estado;

        await _context.SaveChangesAsync();
        return existing;
    }
}
