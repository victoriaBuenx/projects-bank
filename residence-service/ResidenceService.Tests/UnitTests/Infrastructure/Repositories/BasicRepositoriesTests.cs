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

public class RepositoriesTests : IDisposable
{
    private readonly AppDbContext _context;

    public RepositoriesTests()
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

    // --- CompanieRepository Tests ---
    [Fact]
    public async Task CompanieRepo_Create_And_Get()
    {
        var repo = new CompanieRepository(_context);
        var entity = new Companie { nombreEmpresa = "Test", rfc = "RFC123", descripcion="desc", giro="giro", sector="sector", tamañoEmpresa="sm", ciudad="cty", cp="123", direccion="dir", estado="st", pais="mx", telefono="123" };
        
        var created = await repo.CreateAsync(entity);
        var fetched = await repo.GetByIdAsync(created.id);

        created.id.Should().NotBeEmpty();
        fetched.Should().NotBeNull();
        fetched.nombreEmpresa.Should().Be("Test");
    }

    [Fact]
    public async Task CompanieRepo_Update()
    {
        var repo = new CompanieRepository(_context);
        var entity = new Companie { nombreEmpresa = "Test" };
        var created = await repo.CreateAsync(entity);

        created.nombreEmpresa = "Updated";
        var updated = await repo.UpdateAsync(created.id, created);

        updated.nombreEmpresa.Should().Be("Updated");
    }

    [Fact]
    public async Task CompanieRepo_Delete()
    {
        var repo = new CompanieRepository(_context);
        var entity = new Companie { nombreEmpresa = "Test" };
        var created = await repo.CreateAsync(entity);

        var result = await repo.DeleteAsync(created.id);
        result.Should().BeTrue();

        await repo.Invoking(r => r.GetByIdAsync(created.id))
            .Should().ThrowAsync<KeyNotFoundException>();
    }

    [Fact]
    public async Task CompanieRepo_GetAll()
    {
        var repo = new CompanieRepository(_context);
        await repo.CreateAsync(new Companie { nombreEmpresa = "C1" });
        await repo.CreateAsync(new Companie { nombreEmpresa = "C2" });

        var all = await repo.GetAllAsync();
        all.Should().HaveCountGreaterThanOrEqualTo(2);
    }

    [Fact]
    public async Task CompanieRepo_Exceptions()
    {
        var repo = new CompanieRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new Companie())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- CompanieContactRepository Tests ---
    [Fact]
    public async Task CompanieContactRepo_Create_And_Get()
    {
        var repo = new CompanieContactRepository(_context);
        var companie = new Companie { nombreEmpresa = "C1" };
        _context.Companies.Add(companie);
        await _context.SaveChangesAsync();

        var contact = new CompanieContact { idCompanie = companie.id, nombre = "Contact1", apellidoPaterno="P", apellidoMaterno="M", correo="e", horarioAtencion="h", notasAdicionales="n", puesto="p", telefono="t" };
        var created = await repo.CreateAsync(contact);
        var fetched = await repo.GetByIdAsync(created.id);

        fetched.Should().NotBeNull();
        fetched.nombre.Should().Be("Contact1");
        fetched.Companie.Should().NotBeNull();
    }

    [Fact]
    public async Task CompanieContactRepo_GetByCompanieId()
    {
        var repo = new CompanieContactRepository(_context);
        var cId = Guid.NewGuid();
        await repo.CreateAsync(new CompanieContact { idCompanie = cId, nombre = "Contact1" });
        await repo.CreateAsync(new CompanieContact { idCompanie = cId, nombre = "Contact2" });

        var list = await repo.GetByCompanieIdAsync(cId);
        list.Should().HaveCount(2);

        // Update
        var contact = list.First();
        contact.nombre = "Updated Name";
        var updated = await repo.UpdateAsync(contact.id, contact);
        updated.nombre.Should().Be("Updated Name");

        // Get All
        var all = await repo.GetAllAsync();
        all.Should().NotBeEmpty();

        // Delete
        var deleted = await repo.DeleteAsync(contact.id);
        deleted.Should().BeTrue();
    }

    [Fact]
    public async Task CompanieContactRepo_Exceptions()
    {
        var repo = new CompanieContactRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new CompanieContact())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- ProjectRepository Tests ---
    [Fact]
    public async Task ProjectRepo_Create_And_GetByTutor()
    {
        var repo = new ProjectRepository(_context);
        var tutorId = Guid.NewGuid();
        var cId = Guid.NewGuid();
        var sId = Guid.NewGuid();
        
        var project = new Project { idCompanie = cId, nombreProyecto = "P1", status = "Abierto" };
        project.Assignments = new List<ProjectAssignment> { new ProjectAssignment { IdTutor = tutorId, IdEstudiante = sId } };
        
        var created = await repo.CreateAsync(project);
        var fetchedList = await repo.GetByTutorIdAsync(tutorId);

        fetchedList.Should().HaveCount(1);
        fetchedList.First().nombreProyecto.Should().Be("P1");

        // Detailed Update (Touch every property)
        var toUpdate = fetchedList.First();
        
        // Get By Id
        var byId = await repo.GetByIdAsync(toUpdate.id);
        byId.Should().NotBeNull();

        toUpdate.nombreProyecto = "Exhaustive Name";
        toUpdate.descripcion = "New Desc";
        toUpdate.carreras = "C1";
        toUpdate.periodo = "P1";
        toUpdate.plazosEntrega = "Plazo";
        toUpdate.modalidad = "Mod";
        toUpdate.tipoProyecto = "Tipo";
        toUpdate.apoyoEconomico = true;
        toUpdate.montoApoyo = "100";
        toUpdate.numeroEstudiantes = 2;
        toUpdate.status = "Cerrado";
        toUpdate.tecnologias = "Tech";

        var updatedProj = await repo.UpdateAsync(toUpdate.id, toUpdate);
        updatedProj.nombreProyecto.Should().Be("Exhaustive Name");
        updatedProj.descripcion.Should().Be("New Desc");

        // Get All
        var allProjs = await repo.GetAllAsync();
        allProjs.Should().NotBeEmpty();

        // Get By Companie Id
        var byComp = await repo.GetByCompanieIdAsync(cId);
        byComp.Should().NotBeEmpty();

        // Get By Student Id
        var byStudent = await repo.GetByStudentIdAsync(sId);
        byStudent.Should().NotBeEmpty();

        // Delete
        var deleted = await repo.DeleteAsync(toUpdate.id);
        deleted.Should().BeTrue();
    }

    [Fact]
    public async Task ProjectRepo_Exceptions()
    {
        var repo = new ProjectRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new Project())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }

    // --- ProjectAssignmentRepository Tests ---
    [Fact]
    public async Task ProjectAssignmentRepo_CRUD()
    {
        var project = new Project { nombreProyecto = "Test Project" };
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var repo = new ProjectAssignmentRepository(_context);
        var entity = new ProjectAssignment { IdProject = project.id, Estado = "En Proceso" };

        var created = await repo.CreateAsync(entity);
        created.Id.Should().NotBeEmpty();

        created.Estado = "Completado";
        var updated = await repo.UpdateAsync(created.Id, created);
        updated.Estado.Should().Be("Completado");

        var fetched = await repo.GetByIdAsync(created.Id);
        fetched.Should().NotBeNull();

        // Get By Project Id
        var pId = project.id; // Use the project.id defined earlier
        var byProj = await repo.GetByProjectIdAsync(pId);
        byProj.Should().NotBeEmpty();
        byProj.Should().ContainSingle(a => a.Id == created.Id);

        // Update again
        created.Estado = "Updated";
        var updatedAgain = await repo.UpdateAsync(created.Id, created); // Renamed variable
        updatedAgain.Estado.Should().Be("Updated");

        var all = await repo.GetAllAsync();
        all.Should().Contain(a => a.Id == created.Id);

        // Get By Project Id
        var byProjAssign = await repo.GetByProjectIdAsync(project.id);
        byProjAssign.Should().NotBeEmpty();

        // Update
        created.Estado = "Updated";
        var updatedAssign = await repo.UpdateAsync(created.Id, created);
        updatedAssign.Estado.Should().Be("Updated");

        var del = await repo.DeleteAsync(created.Id);
        del.Should().BeTrue();
    }

    [Fact]
    public async Task ProjectAssignmentRepo_Exceptions()
    {
        var repo = new ProjectAssignmentRepository(_context);
        var id = Guid.NewGuid();
        await repo.Invoking(r => r.GetByIdAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.UpdateAsync(id, new ProjectAssignment())).Should().ThrowAsync<KeyNotFoundException>();
        await repo.Invoking(r => r.DeleteAsync(id)).Should().ThrowAsync<KeyNotFoundException>();
    }
}
