using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Application.use_cases.projects;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;
using System.Security.Claims;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class ProjectControllerTests
{
    private readonly Mock<IProjectRepository> _mockRepo = new();
    private readonly ProjectController _controller;

    public ProjectControllerTests()
    {
        var createUC = new CreateProjectUseCase(_mockRepo.Object);
        var getAllUC = new GetAllProjectsUseCase(_mockRepo.Object);
        var getUC = new GetProjectUseCase(_mockRepo.Object);
        var updateUC = new UpdateProjectUseCase(_mockRepo.Object);
        var deleteUC = new DeleteProjectUseCase(_mockRepo.Object);
        _controller = new ProjectController(createUC, getAllUC, getUC, updateUC, deleteUC);

        // Setup default HttpContext with claims for GetAll/GetById
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            new Claim("role", "ADMIN"),
            new Claim("type", "ADMIN")
        };
        var identity = new ClaimsIdentity(claims, "Test");
        var principal = new ClaimsPrincipal(identity);
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = principal }
        };
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        var dto = new CreateProjectDto { nombreProyecto = "Test" };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Project>())).ReturnsAsync(new Project());
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        var dto = new CreateProjectDto();
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Project>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Project>());
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
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new Project());
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
    public async Task GetById_ReturnsForbid_OnUnauthorized()
    {
        var id = Guid.NewGuid();
        // Set non-admin user to trigger UnauthorizedAccessException from use case
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()), new Claim("role", "USER"), new Claim("type", "TUTOR") };
        var identity = new ClaimsIdentity(claims, "Test");
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal(identity) }
        };
        // The project has no assignments for this tutor, so GetProjectUseCase will throw UnauthorizedAccessException
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new Project { Assignments = new List<ProjectAssignment>() });
        var result = await _controller.GetById(id);
        result.Result.Should().BeOfType<ForbidResult>();
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
        var dto = new UpdateProjectDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Project>())).ReturnsAsync(new Project());
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateProjectDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Project>())).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateProjectDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Project>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Update(id, dto);
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
