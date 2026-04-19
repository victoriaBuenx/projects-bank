using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Infrastructure.database.context;

namespace ResidenceService.Api.Infrastructure.database.repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await _context.Projects
            .Include(p => p.Assignments)
            .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetByCompanieIdAsync(Guid companieId)
    {
        return await _context.Projects
            .Where(p => p.idCompanie == companieId)
            .Include(p => p.Assignments)
            .ToListAsync();
    }

    public async Task<Project> GetByIdAsync(Guid id)
    {
        return await _context.Projects
            .Include(p => p.Assignments)
            .FirstOrDefaultAsync(p => p.id == id) ?? throw new KeyNotFoundException("Project not found");
    }

    public async Task<IEnumerable<Project>> GetByStudentIdAsync(Guid studentId)
    {
        return await _context.Projects
            .Where(p => p.Assignments.Any(a => a.IdEstudiante == studentId))
            .Include(p => p.Assignments)
            .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetByTutorIdAsync(Guid tutorId)
    {
        return await _context.Projects
            .Where(p => p.Assignments.Any(a => a.IdTutor == tutorId))
            .Include(p => p.Assignments)
            .ToListAsync();
    }

    public async Task<Project> CreateAsync(Project entity)
    {
        _context.Projects.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Project> UpdateAsync(Guid id, Project entity)
    {
        var existing = await _context.Projects.FindAsync(id) ?? throw new KeyNotFoundException("Project not found");

        existing.nombreProyecto = entity.nombreProyecto;
        existing.descripcion = entity.descripcion;
        existing.carreras = entity.carreras;
        existing.periodo = entity.periodo;
        existing.plazosEntrega = entity.plazosEntrega;
        existing.modalidad = entity.modalidad;
        existing.tipoProyecto = entity.tipoProyecto;
        existing.apoyoEconomico = entity.apoyoEconomico;
        existing.montoApoyo = entity.montoApoyo;
        existing.numeroEstudiantes = entity.numeroEstudiantes;
        existing.status = entity.status;
        existing.tecnologias = entity.tecnologias;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id) ?? throw new KeyNotFoundException("Project not found");

        _context.Projects.Remove(project);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
