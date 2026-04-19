using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Application.use_cases.companies;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class CompanieControllerTests
{
    private readonly Mock<ICompanieRepository> _mockRepo = new();
    private readonly CompanieController _controller;
    private readonly CreateCompanieUseCase _createUC;
    private readonly GetAllCompaniesUseCase _getAllUC;
    private readonly GetCompanieUseCase _getUC;
    private readonly UpdateCompanieUseCase _updateUC;
    private readonly DeleteCompanieUseCase _deleteUC;

    public CompanieControllerTests()
    {
        _createUC = new CreateCompanieUseCase(_mockRepo.Object);
        _getAllUC = new GetAllCompaniesUseCase(_mockRepo.Object);
        _getUC = new GetCompanieUseCase(_mockRepo.Object);
        _updateUC = new UpdateCompanieUseCase(_mockRepo.Object);
        _deleteUC = new DeleteCompanieUseCase(_mockRepo.Object);
        _controller = new CompanieController(_createUC, _getAllUC, _getUC, _updateUC, _deleteUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        var dto = new CreateCompanieDto { nombreEmpresa = "Test" };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Companie>())).ReturnsAsync(new Companie { nombreEmpresa = "Test" });
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        var dto = new CreateCompanieDto { nombreEmpresa = "Test" };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Companie>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Companie>());
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
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new Companie());
        var result = await _controller.GetById(id);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ThrowsAsync(new KeyNotFoundException("not found"));
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
        var dto = new UpdateCompanieDto { nombreEmpresa = "Updated" };
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Companie>())).ReturnsAsync(new Companie());
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Companie>())).ThrowsAsync(new KeyNotFoundException("not found"));
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Companie>())).ThrowsAsync(new Exception("fail"));
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
        _mockRepo.Setup(r => r.DeleteAsync(id)).ThrowsAsync(new KeyNotFoundException("not found"));
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
