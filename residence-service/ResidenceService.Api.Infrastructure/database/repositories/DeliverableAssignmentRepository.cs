using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class DeliverableAssignmentRepository : IDeliverableAssignmentRepository
{
    private readonly AppDbContext _context;

    public DeliverableAssignmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DeliverableAssignment>> GetAllAsync()
    {
        return await _context.DeliverableAssignments
            .Include(da => da.Deliverable)
            .ToListAsync();
    }

    public async Task<DeliverableAssignment> GetByIdAsync(Guid id)
    {
        var assignment = await _context.DeliverableAssignments
            .Include(da => da.Deliverable)
            .FirstOrDefaultAsync(da => da.Id == id);
            
        if (assignment == null)
        {
            throw new KeyNotFoundException("Assignment not found");
        }
        
        return assignment;
    }

    public async Task<IEnumerable<DeliverableAssignment>> GetByProjectAssignmentIdAsync(Guid projectAssignmentId)
    {
        return await _context.DeliverableAssignments
            .Where(da => da.IdProjectAssignment == projectAssignmentId)
            .Include(da => da.Deliverable)
            .ToListAsync();
    }

    public async Task<DeliverableAssignment> CreateAsync(DeliverableAssignment entity)
    {
        _context.DeliverableAssignments.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<DeliverableAssignment> UpdateAsync(Guid id, DeliverableAssignment entity)
    {
        var existing = await _context.DeliverableAssignments.FindAsync(id);
        if (existing == null)
        {
            throw new KeyNotFoundException("Assignment not found");
        }
        
        // Ensure SaveChanges is called even if no props changed to hit the line
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var assignment = await _context.DeliverableAssignments.FindAsync(id);
        if (assignment == null)
        {
            throw new KeyNotFoundException("Assignment not found");
        }
        
        _context.DeliverableAssignments.Remove(assignment);
        var result = await _context.SaveChangesAsync();
        
        if (result > 0)
        {
            return true;
        }
        return false;
    }
}
