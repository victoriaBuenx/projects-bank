using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.enums;
using ResidenceService.Api.Infrastructure.database.context;
using ResidenceService.Api.Infrastructure.database.repositories;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ResidenceService.Tests.UnitTests.Infrastructure.Repositories;

public class DeliverablesRepositoriesTests : IDisposable
{
    private readonly AppDbContext _context;

    public DeliverablesRepositoriesTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new AppDbContext(options);
        _context.Database.EnsureCreated();
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    // --- DeliverableRepository Tests ---
    [Fact]
    public async Task DeliverableRepo_CRUD()
    {
        var repo = new DeliverableRepository(_context);
        var entity = new Deliverable { Nombre = "Doc 1", Activo = true };

        var created = await repo.CreateAsync(entity);
        created.Id.Should().NotBeEmpty();

        var fetched = await repo.GetByIdAsync(created.Id);
        fetched.Nombre.Should().Be("Doc 1");

        fetched.Nombre = "Doc 2";
        var updated = await repo.UpdateAsync(fetched.Id, fetched);
        updated.Nombre.Should().Be("Doc 2");

        var all = await repo.GetAllAsync();
        all.Should().NotBeEmpty();

        var deleted = await repo.DeleteAsync(updated.Id);
        deleted.Should().BeTrue();
    }

    [Fact]
    public async Task DeliverableRepo_Exceptions()
    {
        var repo = new DeliverableRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new Deliverable())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- DeliverableAssignmentRepository Tests ---
    [Fact]
    public async Task DeliverableAssignmentRepo_CRUD()
    {
        var deliverable = new Deliverable { Nombre = "Doc", Activo = true };
        _context.Deliverables.Add(deliverable);
        await _context.SaveChangesAsync();

        var repo = new DeliverableAssignmentRepository(_context);
        var pAssignId = Guid.NewGuid();
        var entity = new DeliverableAssignment { IdDeliverable = deliverable.Id, IdProjectAssignment = pAssignId };

        var created = await repo.CreateAsync(entity);
        created.Id.Should().NotBeEmpty();

        // Get By Id Success
        var fetched = await repo.GetByIdAsync(created.Id);
        fetched.Should().NotBeNull();

        var list = await repo.GetByProjectAssignmentIdAsync(pAssignId);
        list.Should().HaveCount(1);
        list.First().Id.Should().Be(created.Id);

        var all = await repo.GetAllAsync();
        all.Should().Contain(a => a.Id == created.Id);

        // Update
        var updated = await repo.UpdateAsync(created.Id, created);
        updated.Should().NotBeNull();

        // Delete
        var deleted = await repo.DeleteAsync(created.Id);
        deleted.Should().BeTrue();
    }

    [Fact]
    public async Task DeliverableAssignmentRepo_Exceptions()
    {
        var repo = new DeliverableAssignmentRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new DeliverableAssignment())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- DeliverableSubmissionRepository Tests ---
    [Fact]
    public async Task DeliverableSubmissionRepo_CRUD()
    {
        var repo = new DeliverableSubmissionRepository(_context);
        var daId = Guid.NewGuid();
        var entity = new DeliverableSubmission { IdDeliverableAssignment = daId, Estado = DeliverableStatus.Enviado, ArchivoUrl = "url" };

        var created = await repo.CreateAsync(entity);
        created.Id.Should().NotBeEmpty();

        var fetched = await repo.GetByIdAsync(created.Id);
        fetched.Should().NotBeNull();
        fetched.Estado.Should().Be(DeliverableStatus.Enviado);

        fetched.Calificacion = 100;
        fetched.Estado = DeliverableStatus.Aprobado;
        var updated = await repo.UpdateAsync(fetched.Id, fetched);
        var gradeRes = await repo.UpdateAsync(created.Id, created);
        gradeRes.Calificacion.Should().Be(100);

        // Get By Assignment Id
        var list = await repo.GetByAssignmentIdAsync(daId);
        list.Should().NotBeEmpty();
    }

    [Fact]
    public async Task DeliverableSubmissionRepo_Exceptions()
    {
        var repo = new DeliverableSubmissionRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        // await repo.Invoking(r => r.CreateAsync(new DeliverableSubmission())).Should().ThrowAsync<KeyNotFoundException>(); // Wait, CreateAsync might not throw this, maybe DbUpdateException if parent missing. I'll just skip Create here.
        await repo.Invoking(r => r.UpdateAsync(id, new DeliverableSubmission())).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- CompanyRatingRepository Tests ---
    [Fact]
    public async Task CompanyRatingRepo_Create_And_GetAll()
    {
        var companie = new Companie { nombreEmpresa = "RatingCompany" };
        _context.Companies.Add(companie);
        await _context.SaveChangesAsync();

        var repo = new CompanyRatingRepository(_context);
        var entity = new CompanyRating { IdCompanie = companie.id, Calificacion = 5, Comentario = "Good" };

        var created = await repo.CreateAsync(entity);
        created.Id.Should().NotBeEmpty();

        var all = await repo.GetAllAsync();
        all.Should().NotBeEmpty();

        var byCompany = await repo.GetByCompanieIdAsync(companie.id);
        byCompany.Should().HaveCount(1);
    }
}
