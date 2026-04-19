using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ResidenceService.Api.Application.dtos.companyRatings;
using ResidenceService.Api.Application.use_cases.companyRatings;
using ResidenceService.Api.Controllers;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using FluentAssertions;
using System.Security.Claims;

namespace ResidenceService.Tests.UnitTests.Presentation;

public class CompanyRatingControllerTests
{
    private readonly Mock<ICompanyRatingRepository> _mockRepo = new();
    private readonly Mock<ICompanieRepository> _mockCompanieRepo = new();
    private readonly CompanyRatingController _controller;

    public CompanyRatingControllerTests()
    {
        var createUC = new CreateCompanyRatingUseCase(_mockRepo.Object, _mockCompanieRepo.Object);
        var getAllUC = new GetAllCompanyRatingsUseCase(_mockRepo.Object);
        _controller = new CompanyRatingController(createUC, getAllUC);

        // Setup HttpContext with valid student identity
        var studentId = Guid.NewGuid();
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, studentId.ToString()),
            new Claim("role", "STUDENT"),
            new Claim("type", "STUDENT")
        };
        var identity = new ClaimsIdentity(claims, "Test");
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal(identity) }
        };
    }

    // ─── Create (happy path with valid Guid identity) ───
    [Fact]
    public async Task Create_ReturnsOk()
    {
        var dto = new CreateCompanyRatingDto { IdCompanie = Guid.NewGuid(), Calificacion = 5, IdProjectAssignment = Guid.NewGuid() };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<CompanyRating>())).ReturnsAsync(new CompanyRating());
        _mockRepo.Setup(r => r.GetByCompanieIdAsync(It.IsAny<Guid>())).ReturnsAsync(new List<CompanyRating> { new CompanyRating { Calificacion = 5 } });
        _mockCompanieRepo.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(new Companie());
        _mockCompanieRepo.Setup(r => r.UpdateAsync(It.IsAny<Guid>(), It.IsAny<Companie>())).ReturnsAsync(new Companie());

        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    // ─── Create (invalid identity - no NameIdentifier claim) ───
    [Fact]
    public async Task Create_ReturnsBadRequest_WhenInvalidIdentity()
    {
        // Set up user without NameIdentifier claim
        var claims = new[] { new Claim("role", "STUDENT") };
        var identity = new ClaimsIdentity(claims, "Test");
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal(identity) }
        };

        var dto = new CreateCompanyRatingDto();
        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── Create (exception) ───
    [Fact]
    public async Task Create_ReturnsBadRequest_OnException()
    {
        var dto = new CreateCompanyRatingDto { IdCompanie = Guid.NewGuid(), IdProjectAssignment = Guid.NewGuid() };
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<CompanyRating>())).ThrowsAsync(new Exception("fail"));

        var result = await _controller.Create(dto);
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ─── GetAll ───
    [Fact]
    public async Task GetAll_ReturnsOk_WithoutFilter()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<CompanyRating>());
        var result = await _controller.GetAll(null);
        result.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ReturnsOk_WithFilter()
    {
        var companyId = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByCompanieIdAsync(companyId)).ReturnsAsync(new List<CompanyRating>());
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
}
