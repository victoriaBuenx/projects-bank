using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.deliverables;
using ResidenceService.Api.Application.use_cases.deliverables;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class DeliverableControllerTests
{
    private readonly Mock<IDeliverableRepository> _mockRepo = new();
    private readonly DeliverableController _controller;

    public DeliverableControllerTests()
    {
        var createUC = new CreateDeliverableUseCase(_mockRepo.Object);
        var getAllUC = new GetAllDeliverablesUseCase(_mockRepo.Object);
        var getUC = new GetDeliverableUseCase(_mockRepo.Object);
        var updateUC = new UpdateDeliverableUseCase(_mockRepo.Object);
        var deleteUC = new DeleteDeliverableUseCase(_mockRepo.Object);
        _controller = new DeliverableController(createUC, getAllUC, getUC, updateUC, deleteUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Deliverable>())).ReturnsAsync(new Deliverable());
        var result = await _controller.Create(new CreateDeliverableDto { Nombre = "Test" });
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<Deliverable>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(new CreateDeliverableDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Deliverable>());
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
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new Deliverable());
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

    // ─── Update ───
    [Fact]
    public async Task Update_ReturnsOk()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Deliverable>())).ReturnsAsync(new Deliverable());
        var result = await _controller.Update(id, new UpdateDeliverableDto());
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<Deliverable>())).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Update(id, new UpdateDeliverableDto());
        result.Result.Should().BeOfType<NotFoundObjectResult>();
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
    public async Task Delete_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id)).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Delete(id);
        result.Should().BeOfType<NotFoundObjectResult>();
    }
}
