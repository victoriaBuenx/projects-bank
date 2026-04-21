using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Application.use_cases.companyContacts;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class CompanieContactControllerTests
{
    private readonly Mock<ICompanieContactRepository> _mockRepo = new();
    private readonly CompanieContactController _controller;

    public CompanieContactControllerTests()
    {
        var createUC = new CreateCompanieContactUseCase(_mockRepo.Object);
        var getAllUC = new GetAllCompanieContactsUseCase(_mockRepo.Object);
        var getUC = new GetCompanieContactUseCase(_mockRepo.Object);
        var updateUC = new UpdateCompanieContactUseCase(_mockRepo.Object);
        var deleteUC = new DeleteCompanieContactUseCase(_mockRepo.Object);
        _controller = new CompanieContactController(createUC, getAllUC, getUC, updateUC, deleteUC);
    }

    // ─── Create ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        var dto = new CreateCompanieContactDto { nombre = "John" };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<CompanieContact>())).ReturnsAsync(new CompanieContact());
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        var dto = new CreateCompanieContactDto();
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<CompanieContact>())).ThrowsAsync(new Exception("fail"));
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk_WithoutFilter()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<CompanieContact>());
        var result = await _controller.GetAll(null);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsOk_WithFilter()
    {
        var companyId = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByCompanieIdAsync(companyId)).ReturnsAsync(new List<CompanieContact>());
        var result = await _controller.GetAll(companyId);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsBadRequest_OnException()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ThrowsAsync(new Exception("fail"));
        var result = await _controller.GetAll(null);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetById ───
    [Fact]
    public async Task GetById_ReturnsOk()
    {
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(new CompanieContact());
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
        var dto = new UpdateCompanieContactDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<CompanieContact>())).ReturnsAsync(new CompanieContact());
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsNotFound_OnKeyNotFound()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieContactDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<CompanieContact>())).ThrowsAsync(new KeyNotFoundException("nf"));
        var result = await _controller.Update(id, dto);
        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_OnException()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieContactDto();
        _mockRepo.Setup(r => r.UpdateAsync(id, It.IsAny<CompanieContact>())).ThrowsAsync(new Exception("fail"));
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
