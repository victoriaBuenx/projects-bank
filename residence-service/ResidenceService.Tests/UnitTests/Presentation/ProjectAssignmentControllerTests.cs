using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.projectAssignments;
using ResidenceService.Api.Application.use_cases.projectAssignments;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class ProjectAssignmentControllerTests
{
    private readonly Mock<IProjectAssignmentRepository> _mockRepo = new();
    private readonly ProjectAssignmentController _controller;

    public ProjectAssignmentControllerTests()
    {
        var createUC = new CreateProjectAssignmentUseCase(_mockRepo.Object);
        var getAllUC = new GetAllProjectAssignmentsUseCase(_mockRepo.Object);
        var getUC = new GetProjectAssignmentUseCase(_mockRepo.Object);
        var updateUC = new UpdateProjectAssignmentUseCase(_mockRepo.Object);
        var deleteUC = new DeleteProjectAssignmentUseCase(_mockRepo.Object);
        _controller = new ProjectAssignmentController(createUC, getAllUC, getUC, updateUC, deleteUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<ProjectAssignment>())).ReturnsAsync(new ProjectAssignment());
        var result = await _controller.Create(new CreateProjectAssignmentDto { IdProject = Guid.NewGuid(), IdEstudiante = Guid.NewGuid(), IdTutor = Guid.NewGuid() });
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<ProjectAssignment>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(new CreateProjectAssignmentDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<ProjectAssignment>());
        var result = await _controller.GetAll();
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ThrowsAsync(new Exception("fail"));
        var result = await _controller.GetAll();
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetById ───
    [Fact]
    public async Task GetById_ReturnsOk()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new ProjectAssignment());
        var result = await _controller.GetById(id);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.GetById(id);
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task GetById_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ThrowsAsync(new Exception("fail"));
        var result = await _controller.GetById(id);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── Update ───
    [Fact]
    public async Task Update_ReturnsOk()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<ProjectAssignment>())).ReturnsAsync(new ProjectAssignment());
        var result = await _controller.Update(id, new UpdateProjectAssignmentDto());
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<ProjectAssignment>())).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Update(id, new UpdateProjectAssignmentDto());
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<ProjectAssignment>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Update(id, new UpdateProjectAssignmentDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── Delete ───
    [Fact]
    public async Task Delete_ReturnsNoContent()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id)).ReturnsAsync(true);
        var result = await _controller.Delete(id);
        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task Delete_ReturnsBadRequest_WhenFalse()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id)).ReturnsAsync(false);
        var result = await _controller.Delete(id);
        result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id)).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Delete(id);
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Delete_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id)).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Delete(id);
        result.Should().BeOfType<BadRequestObjectResult>();
    }
}
