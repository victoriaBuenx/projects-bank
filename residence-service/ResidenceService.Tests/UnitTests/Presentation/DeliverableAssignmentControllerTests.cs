using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.deliverableAssignments;
using ResidenceService.Api.Application.use_cases.deliverableAssignments;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class DeliverableAssignmentControllerTests
{
    private readonly Mock<IDeliverableAssignmentRepository> _mockRepo = new();
    private readonly DeliverableAssignmentController _controller;

    public DeliverableAssignmentControllerTests()
    {
        var createUC = new CreateDeliverableAssignmentUseCase(_mockRepo.Object);
        var getAllUC = new GetAllDeliverableAssignmentsUseCase(_mockRepo.Object);
        _controller = new DeliverableAssignmentController(createUC, getAllUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<DeliverableAssignment>())).ReturnsAsync(new DeliverableAssignment());
        var result = await _controller.Create(new CreateDeliverableAssignmentDto());
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<DeliverableAssignment>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(new CreateDeliverableAssignmentDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk_WithoutFilter()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<DeliverableAssignment>());
        var result = await _controller.GetAll(null);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsOk_WithFilter()
    {
        var paId = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByProjectAssignmentIdAsync(paId)).ReturnsAsync(new List<DeliverableAssignment>());
        var result = await _controller.GetAll(paId);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ThrowsAsync(new Exception("fail"));
        var result = await _controller.GetAll(null);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }
}
