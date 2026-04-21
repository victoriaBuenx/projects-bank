using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Application.use_cases.projects;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.Projects;

public class ProjectsUseCasesTests
{
    private readonly Mock<IProjectRepository> _mockRepository;

    public ProjectsUseCasesTests()
    {
        _mockRepository = new Mock<IProjectRepository>();
    }

    [Fact]
    public async Task CreateProjectUseCase_Should_Return_Created_Project()
    {
        // Arrange
        var dto = new CreateProjectDto
        {
            idCompanie = Guid.NewGuid(),
            nombreProyecto = "Test Project",
            descripcion = "Desc",
            carreras = "CS",
            periodo = "2026-1",
            plazosEntrega = "6 months",
            modalidad = "Presencial",
            tipoProyecto = "Internship",
            apoyoEconomico = true,
            montoApoyo = "5000",
            numeroEstudiantes = 3,
            tecnologias = "C#, React"
        };

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Project>()))
            .ReturnsAsync((Project p) => p);

        var useCase = new CreateProjectUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.nombreProyecto.Should().Be(dto.nombreProyecto);
        result.status.Should().Be("Abierto");
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<Project>()), Times.Once);
    }

    [Theory]
    [InlineData("ADMIN", null, null)]
    [InlineData(null, "STUDENT", null)]
    public async Task GetProjectUseCase_AdminOrStudent_Should_Return_Project(string? role, string? type, string? userId)
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new Project { id = id, nombreProyecto = "Test" };
        
        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);
        var useCase = new GetProjectUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, role, type, userId);

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
    }

    [Fact]
    public async Task GetProjectUseCase_TutorAssigned_Should_Return_Project()
    {
        // Arrange
        var id = Guid.NewGuid();
        var tutorId = Guid.NewGuid();
        var entity = new Project 
        { 
            id = id, 
            nombreProyecto = "Test",
            Assignments = new List<ProjectAssignment> { new ProjectAssignment { IdTutor = tutorId } }
        };
        
        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);
        var useCase = new GetProjectUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, null, "TUTOR", tutorId.ToString());

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
    }

    [Fact]
    public async Task GetProjectUseCase_TutorNotAssigned_Should_Throw_Unauthorized()
    {
        // Arrange
        var id = Guid.NewGuid();
        var tutorId = Guid.NewGuid();
        var entity = new Project 
        { 
            id = id, 
            nombreProyecto = "Test",
            Assignments = new List<ProjectAssignment> { new ProjectAssignment { IdTutor = Guid.NewGuid() } }
        };
        
        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);
        var useCase = new GetProjectUseCase(_mockRepository.Object);

        // Act & Assert
        await useCase.Invoking(u => u.ExecuteAsync(id, null, "TUTOR", tutorId.ToString()))
                     .Should().ThrowAsync<UnauthorizedAccessException>();
    }

    [Fact]
    public async Task GetProjectUseCase_InvalidUser_Should_Throw_Unauthorized()
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new Project { id = id, nombreProyecto = "Test" };
        
        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);
        var useCase = new GetProjectUseCase(_mockRepository.Object);

        // Act & Assert
        await useCase.Invoking(u => u.ExecuteAsync(id, null, null, null))
                     .Should().ThrowAsync<UnauthorizedAccessException>();
    }

    [Theory]
    [InlineData("ADMIN", null)]
    [InlineData(null, "STUDENT")]
    public async Task GetAllProjectsUseCase_AdminOrStudent_Should_Return_All(string? role, string? type)
    {
        // Arrange
        var list = new List<Project> { new Project { id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var useCase = new GetAllProjectsUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(role, type, null);

        // Assert
        result.Should().HaveCount(1);
        _mockRepository.Verify(x => x.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetAllProjectsUseCase_Tutor_Should_Return_Assigned()
    {
        // Arrange
        var tutorId = Guid.NewGuid();
        var list = new List<Project> { new Project { id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetByTutorIdAsync(tutorId)).ReturnsAsync(list);

        var useCase = new GetAllProjectsUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(null, "TUTOR", tutorId.ToString());

        // Assert
        result.Should().HaveCount(1);
        _mockRepository.Verify(x => x.GetByTutorIdAsync(tutorId), Times.Once);
    }

    [Fact]
    public async Task GetAllProjectsUseCase_InvalidUser_Should_Return_Empty()
    {
        var useCase = new GetAllProjectsUseCase(_mockRepository.Object);
        var result = await useCase.ExecuteAsync(null, null, null);
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAllProjectsUseCase_Tutor_InvalidGuid_Should_Return_Empty()
    {
        var useCase = new GetAllProjectsUseCase(_mockRepository.Object);
        var result = await useCase.ExecuteAsync(null, "TUTOR", "invalid-guid");
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAllProjectsUseCase_ValidUser_NotTutor_Should_Return_Empty()
    {
        var useCase = new GetAllProjectsUseCase(_mockRepository.Object);
        var result = await useCase.ExecuteAsync(null, "OTHER", Guid.NewGuid().ToString());
        result.Should().BeEmpty();
    }

    [Fact]
    public async Task UpdateProjectUseCase_Should_Return_Updated_Project()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new UpdateProjectDto { nombreProyecto = "Updated", status = "Cerrado" };

        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<Project>()))
            .ReturnsAsync((Guid g, Project p) => { p.id = g; return p; });

        var useCase = new UpdateProjectUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, dto);

        // Assert
        result.Should().NotBeNull();
        result.nombreProyecto.Should().Be("Updated");
        result.status.Should().Be("Cerrado");
    }

    [Fact]
    public async Task DeleteProjectUseCase_Should_Return_True()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepository.Setup(x => x.DeleteAsync(id)).ReturnsAsync(true);

        var useCase = new DeleteProjectUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().BeTrue();
    }
}
