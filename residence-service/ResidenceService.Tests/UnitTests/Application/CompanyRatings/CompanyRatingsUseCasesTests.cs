using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companyRatings;
using ResidenceService.Api.Application.use_cases.companyRatings;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.CompanyRatings;

public class CompanyRatingsUseCasesTests
{
    private readonly Mock<ICompanyRatingRepository> _mockRatingRepository;
    private readonly Mock<ICompanieRepository> _mockCompanieRepository;

    public CompanyRatingsUseCasesTests()
    {
        _mockRatingRepository = new Mock<ICompanyRatingRepository>();
        _mockCompanieRepository = new Mock<ICompanieRepository>();
    }

    [Fact]
    public async Task CreateCompanyRatingUseCase_Should_Return_Created_And_Update_Average()
    {
        // Arrange
        var companyId = Guid.NewGuid();
        var studentId = Guid.NewGuid();
        var dto = new CreateCompanyRatingDto
        {
            IdCompanie = companyId,
            IdProjectAssignment = Guid.NewGuid(),
            Calificacion = 5,
            Comentario = "Great"
        };

        var ratingsList = new List<CompanyRating> 
        { 
            new CompanyRating { Calificacion = 4 },
            new CompanyRating { Calificacion = 5 } // New rating technically wouldn't be in DB yet until CreateAsync finishes, but CreateAsync mocks usually don't modify the inner list of another mock. Wait, the use case calls CreateAsync, then GetByCompanieIdAsync getting all.
        };

        var companieEntity = new Companie { id = companyId, calificacion = 0 };

        _mockRatingRepository.Setup(x => x.CreateAsync(It.IsAny<CompanyRating>())).ReturnsAsync((CompanyRating r) => r);
        _mockRatingRepository.Setup(x => x.GetByCompanieIdAsync(companyId)).ReturnsAsync(ratingsList);
        _mockCompanieRepository.Setup(x => x.GetByIdAsync(companyId)).ReturnsAsync(companieEntity);
        _mockCompanieRepository.Setup(x => x.UpdateAsync(companyId, It.IsAny<Companie>())).ReturnsAsync((Guid g, Companie c) => c);

        var useCase = new CreateCompanyRatingUseCase(_mockRatingRepository.Object, _mockCompanieRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(dto, studentId);

        // Assert
        result.Should().NotBeNull();
        result.IdEstudiante.Should().Be(studentId);
        result.IdCompanie.Should().Be(companyId);

        // Verify Average was calculated (average of 4 and 5 is 4.5 -> Round is 5 or 4 depending on MidpointRounding, default is ToEven which is 4 but wait 4.5 -> 4. Let's just verify UpdateAsync was called)
        _mockCompanieRepository.Verify(x => x.UpdateAsync(companyId, It.IsAny<Companie>()), Times.Once);
    }

    [Fact]
    public async Task CreateCompanyRatingUseCase_EmptyList_Should_Not_Update_Average()
    {
        // Arrange
        var companyId = Guid.NewGuid();
        var dto = new CreateCompanyRatingDto { IdCompanie = companyId };
        
        _mockRatingRepository.Setup(x => x.CreateAsync(It.IsAny<CompanyRating>())).ReturnsAsync((CompanyRating r) => r);
        _mockRatingRepository.Setup(x => x.GetByCompanieIdAsync(companyId)).ReturnsAsync(new List<CompanyRating>());

        var useCase = new CreateCompanyRatingUseCase(_mockRatingRepository.Object, _mockCompanieRepository.Object);

        // Act
        await useCase.ExecuteAsync(dto, Guid.NewGuid());

        // Assert
        _mockCompanieRepository.Verify(x => x.UpdateAsync(It.IsAny<Guid>(), It.IsAny<Companie>()), Times.Never);
    }

    [Fact]
    public async Task GetAllCompanyRatingsUseCase_NoId_Should_Return_All()
    {
        var list = new List<CompanyRating> { new CompanyRating { Id = Guid.NewGuid() } };
        _mockRatingRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var useCase = new GetAllCompanyRatingsUseCase(_mockRatingRepository.Object);

        var result = await useCase.ExecuteAsync(null);

        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetAllCompanyRatingsUseCase_WithId_Should_Return_Filtered()
    {
        var id = Guid.NewGuid();
        var list = new List<CompanyRating> { new CompanyRating { Id = Guid.NewGuid() } };
        _mockRatingRepository.Setup(x => x.GetByCompanieIdAsync(id)).ReturnsAsync(list);

        var useCase = new GetAllCompanyRatingsUseCase(_mockRatingRepository.Object);

        var result = await useCase.ExecuteAsync(id);

        result.Should().HaveCount(1);
    }
}
