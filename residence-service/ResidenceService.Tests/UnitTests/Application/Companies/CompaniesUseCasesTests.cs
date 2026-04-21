using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Application.use_cases.companies;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.Companies;

public class CompaniesUseCasesTests
{
    private readonly Mock<ICompanieRepository> _mockRepository;

    public CompaniesUseCasesTests()
    {
        _mockRepository = new Mock<ICompanieRepository>();
    }

    [Fact]
    public async Task CreateCompanieUseCase_Should_Return_Created_Companie()
    {
        // Arrange
        var dto = new CreateCompanieDto
        {
            nombreEmpresa = "Test Company",
            rfc = "TEST123456789",
            descripcion = "Desc",
            giro = "Tech",
            sector = "Private",
            tamañoEmpresa = "Small",
            direccion = "123 Street",
            ciudad = "City",
            estado = "State",
            pais = "Country",
            cp = "12345",
            telefono = "5551234",
            convenio = true
        };

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Companie>()))
            .ReturnsAsync((Companie c) => c);

        var useCase = new CreateCompanieUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.nombreEmpresa.Should().Be(dto.nombreEmpresa);
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<Companie>()), Times.Once);
    }

    [Fact]
    public async Task GetCompanieUseCase_Should_Return_Companie_When_Exists()
    {
        // Arrange
        var id = Guid.NewGuid();
        var expectedEntity = new Companie { id = id, nombreEmpresa = "Test Company" };

        _mockRepository.Setup(x => x.GetByIdAsync(id))
            .ReturnsAsync(expectedEntity);

        var useCase = new GetCompanieUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
        result.nombreEmpresa.Should().Be("Test Company");
        _mockRepository.Verify(x => x.GetByIdAsync(id), Times.Once);
    }

    [Fact]
    public async Task GetAllCompaniesUseCase_Should_Return_List_Of_Companies()
    {
        // Arrange
        var list = new List<Companie>
        {
            new Companie { id = Guid.NewGuid(), nombreEmpresa = "Company 1" },
            new Companie { id = Guid.NewGuid(), nombreEmpresa = "Company 2" }
        };

        _mockRepository.Setup(x => x.GetAllAsync())
            .ReturnsAsync(list);

        var useCase = new GetAllCompaniesUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync();

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(2);
        _mockRepository.Verify(x => x.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateCompanieUseCase_Should_Return_Updated_Companie()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieDto
        {
            nombreEmpresa = "Updated Company",
            rfc = "UPDATEDRFC",
            descripcion = "Desc"
        };

        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<Companie>()))
            .ReturnsAsync((Guid g, Companie c) => { c.id = g; return c; });

        var useCase = new UpdateCompanieUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, dto);

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
        result.nombreEmpresa.Should().Be(dto.nombreEmpresa);
        _mockRepository.Verify(x => x.UpdateAsync(id, It.Is<Companie>(c => c.nombreEmpresa == "Updated Company")), Times.Once);
    }

    [Fact]
    public async Task DeleteCompanieUseCase_Should_Return_True_When_Deleted()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepository.Setup(x => x.DeleteAsync(id)).ReturnsAsync(true);

        var useCase = new DeleteCompanieUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().BeTrue();
        _mockRepository.Verify(x => x.DeleteAsync(id), Times.Once);
    }
}
