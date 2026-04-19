using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Application.use_cases.companyContacts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.CompanyContacts;

public class CompanyContactsUseCasesTests
{
    private readonly Mock<ICompanieContactRepository> _mockRepository;

    public CompanyContactsUseCasesTests()
    {
        _mockRepository = new Mock<ICompanieContactRepository>();
    }

    [Fact]
    public async Task CreateCompanieContactUseCase_Should_Return_Created_Contact()
    {
        // Arrange
        var dto = new CreateCompanieContactDto
        {
            idCompanie = Guid.NewGuid(),
            nombre = "John",
            apellidoPaterno = "Doe",
            apellidoMaterno = "Smith",
            puesto = "Manager",
            telefono = "555-1234",
            correo = "john@example.com",
            horarioAtencion = "9-5",
            notasAdicionales = "Test"
        };

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<CompanieContact>()))
            .ReturnsAsync((CompanieContact c) => c);

        var useCase = new CreateCompanieContactUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.nombre.Should().Be(dto.nombre);
        result.idCompanie.Should().Be(dto.idCompanie);
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<CompanieContact>()), Times.Once);
    }

    [Fact]
    public async Task GetCompanieContactUseCase_Should_Return_Contact()
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new CompanieContact { id = id, nombre = "John" };

        _mockRepository.Setup(x => x.GetByIdAsync(id))
            .ReturnsAsync(entity);

        var useCase = new GetCompanieContactUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
        result.nombre.Should().Be("John");
        _mockRepository.Verify(x => x.GetByIdAsync(id), Times.Once);
    }

    [Fact]
    public async Task GetAllCompanieContactsUseCase_Should_Return_All_Contacts_Or_By_CompanieId()
    {
        // Arrange
        var companieId = Guid.NewGuid();
        var listAll = new List<CompanieContact> { new CompanieContact { id = Guid.NewGuid() } };
        var listByCompanie = new List<CompanieContact> { new CompanieContact { id = Guid.NewGuid(), idCompanie = companieId } };

        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(listAll);
        _mockRepository.Setup(x => x.GetByCompanieIdAsync(companieId)).ReturnsAsync(listByCompanie);

        var useCase = new GetAllCompanieContactsUseCase(_mockRepository.Object);

        // Act 1: Get All
        var resultAll = await useCase.ExecuteAsync();

        // Act 2: Get By CompanieId
        var resultByCompanie = await useCase.ExecuteAsync(companieId);

        // Assert
        resultAll.Should().HaveCount(1);
        _mockRepository.Verify(x => x.GetAllAsync(), Times.Once);

        resultByCompanie.Should().HaveCount(1);
        _mockRepository.Verify(x => x.GetByCompanieIdAsync(companieId), Times.Once);
    }

    [Fact]
    public async Task UpdateCompanieContactUseCase_Should_Return_Updated_Contact()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new UpdateCompanieContactDto
        {
            nombre = "Jane",
            apellidoPaterno = "Doe",
            apellidoMaterno = "S",
            puesto = "CEO",
            telefono = "555-5555",
            correo = "jane@example.com",
            horarioAtencion = "10-4",
            notasAdicionales = "Updated"
        };

        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<CompanieContact>()))
            .ReturnsAsync((Guid g, CompanieContact c) => { c.id = g; return c; });

        var useCase = new UpdateCompanieContactUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id, dto);

        // Assert
        result.Should().NotBeNull();
        result.id.Should().Be(id);
        result.nombre.Should().Be(dto.nombre);
        _mockRepository.Verify(x => x.UpdateAsync(id, It.Is<CompanieContact>(c => c.nombre == "Jane")), Times.Once);
    }

    [Fact]
    public async Task DeleteCompanieContactUseCase_Should_Return_True()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepository.Setup(x => x.DeleteAsync(id)).ReturnsAsync(true);

        var useCase = new DeleteCompanieContactUseCase(_mockRepository.Object);

        // Act
        var result = await useCase.ExecuteAsync(id);

        // Assert
        result.Should().BeTrue();
        _mockRepository.Verify(x => x.DeleteAsync(id), Times.Once);
    }
}
