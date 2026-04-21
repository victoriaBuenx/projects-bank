using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.projectAssignments;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class ProjectAssignmentRepository : IProjectAssignmentRepository
{
    private readonly AppDbContext _context;

    public ProjectAssignmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProjectAssignment>> GetAllAsync()
    {
        return await _context.ProjectAssignments
            .Include(pa => pa.Project)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProjectAssignment>> GetByProjectIdAsync(Guid projectId)
    {
        return await _context.ProjectAssignments
            .Where(pa => pa.IdProject == projectId)
            .Include(pa => pa.Project)
            .ToListAsync();
    }

    public async Task<ProjectAssignment> GetByIdAsync(Guid id)
    {
        return await _context.ProjectAssignments
            .Include(pa => pa.Project)
            .FirstOrDefaultAsync(pa => pa.Id == id) ?? throw new KeyNotFoundException("Project assignment not found");
    }

    public async Task<ProjectAssignment> CreateAsync(ProjectAssignment entity)
    {
        _context.ProjectAssignments.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<ProjectAssignment> UpdateAsync(Guid id, ProjectAssignment entity)
    {
        var existing = await _context.ProjectAssignments.FindAsync(id) ?? throw new KeyNotFoundException("Project assignment not found");

        existing.Estado = entity.Estado;
        existing.FechaFinalizacion = entity.FechaFinalizacion;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var assignment = await _context.ProjectAssignments.FindAsync(id) ?? throw new KeyNotFoundException("Project assignment not found");

        _context.ProjectAssignments.Remove(assignment);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
