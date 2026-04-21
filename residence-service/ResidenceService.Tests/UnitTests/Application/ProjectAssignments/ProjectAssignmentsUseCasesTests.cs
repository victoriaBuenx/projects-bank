using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.projectAssignments;
using ResidenceService.Api.Application.use_cases.projectAssignments;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.ProjectAssignments;

public class ProjectAssignmentsUseCasesTests
{
    private readonly Mock<IProjectAssignmentRepository> _mockRepository;

    public ProjectAssignmentsUseCasesTests()
    {
        _mockRepository = new Mock<IProjectAssignmentRepository>();
    }

    [Fact]
    public async Task CreateProjectAssignmentUseCase_Should_Return_Created_Assignment()
    {
        // Arrange
        var dto = new CreateProjectAssignmentDto
        {
            IdProject = Guid.NewGuid(),
            IdEstudiante = Guid.NewGuid(),
            IdTutor = Guid.NewGuid(),
            Estado = "En Proceso"
        };

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<ProjectAssignment>()))
            .ReturnsAsync((ProjectAssignment p) => p);

        var useCase = new CreateProjectAssignmentUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.IdProject.Should().Be(dto.IdProject);
        result.IdEstudiante.Should().Be(dto.IdEstudiante);
        result.IdTutor.Should().Be(dto.IdTutor);
        result.Estado.Should().Be("En Proceso");
        result.FechaAsignacion.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<ProjectAssignment>()), Times.Once);
    }

    [Fact]
    public async Task GetProjectAssignmentUseCase_Should_Return_Assignment()
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new ProjectAssignment { Id = id, Estado = "En Proceso" };

        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);
        var useCase = new GetProjectAssignmentUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(id);
        result.Estado.Should().Be("En Proceso");
    }

    [Fact]
    public async Task GetAllProjectAssignmentsUseCase_Should_Return_List()
    {
        // Arrange
        var list = new List<ProjectAssignment> { new ProjectAssignment { Id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var useCase = new GetAllProjectAssignmentsUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync();

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task UpdateProjectAssignmentUseCase_Should_Return_Updated_Assignment()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new UpdateProjectAssignmentDto
        {
            Estado = "Completado",
            FechaFinalizacion = DateTime.UtcNow
        };

        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<ProjectAssignment>()))
            .ReturnsAsync((Guid g, ProjectAssignment p) => { p.Id = g; return p; });

        var useCase = new UpdateProjectAssignmentUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, dto);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(id);
        result.Estado.Should().Be("Completado");
        result.FechaFinalizacion.Should().Be(dto.FechaFinalizacion);
    }

    [Fact]
    public async Task DeleteProjectAssignmentUseCase_Should_Return_True()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepository.Setup(x => x.DeleteAsync(id)).ReturnsAsync(true);

        var useCase = new DeleteProjectAssignmentUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().BeTrue();
    }
}
