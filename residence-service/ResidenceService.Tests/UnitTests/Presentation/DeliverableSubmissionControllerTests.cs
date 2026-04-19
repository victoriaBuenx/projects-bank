using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.deliverableSubmissions;
using ResidenceService.Api.Application.use_cases.deliverableSubmissions;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class DeliverableSubmissionControllerTests
{
    private readonly Mock<IDeliverableSubmissionRepository> _mockRepo = new();
    private readonly DeliverableSubmissionController _controller;

    public DeliverableSubmissionControllerTests()
    {
        var createUC = new CreateDeliverableSubmissionUseCase(_mockRepo.Object);
        var gradeUC = new GradeDeliverableSubmissionUseCase(_mockRepo.Object);
        _controller = new DeliverableSubmissionController(createUC, gradeUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<DeliverableSubmission>())).ReturnsAsync(new DeliverableSubmission());
        var result = await _controller.Create(new CreateDeliverableSubmissionDto());
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<DeliverableSubmission>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(new CreateDeliverableSubmissionDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── Grade ───
    [Fact]
    public async Task Grade_ReturnsOk()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<DeliverableSubmission>())).ReturnsAsync(new DeliverableSubmission());
        var result = await _controller.Grade(id, new GradeDeliverableSubmissionDto());
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Grade_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<DeliverableSubmission>())).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Grade(id, new GradeDeliverableSubmissionDto());
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Grade_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<DeliverableSubmission>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Grade(id, new GradeDeliverableSubmissionDto());
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }
}
