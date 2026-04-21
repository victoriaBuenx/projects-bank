using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverables;
using ResidenceService.Api.Application.use_cases.deliverables;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.Deliverables;

public class DeliverablesUseCasesTests
{
    private readonly Mock<IDeliverableRepository> _mockRepository;

    public DeliverablesUseCasesTests()
    {
        _mockRepository = new Mock<IDeliverableRepository>();
    }

    [Fact]
    public async Task CreateDeliverableUseCase_Should_Return_Created_Deliverable()
    {
        var dto = new CreateDeliverableDto
        {
            Nombre = "Doc 1",
            Descripcion = "First document",
            FechaLimite = DateTime.UtcNow.AddDays(7),
            FormatoMuestra = "PDF",
            Comentarios = "None"
        };
        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Deliverable>()))
            .ReturnsAsync((Deliverable d) => d);

        var useCase = new CreateDeliverableUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(dto);

        result.Should().NotBeNull();
        result.Nombre.Should().Be(dto.Nombre);
        result.Activo.Should().BeTrue();
    }

    [Fact]
    public async Task GetDeliverableUseCase_Should_Return_Deliverable()
    {
        var id = Guid.NewGuid();
        var entity = new Deliverable { Id = id };
        _mockRepository.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(entity);

        var useCase = new GetDeliverableUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(id);

        result.Should().NotBeNull();
        result.Id.Should().Be(id);
    }

    [Fact]
    public async Task GetAllDeliverablesUseCase_Should_Return_List()
    {
        var list = new List<Deliverable> { new Deliverable { Id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var useCase = new GetAllDeliverablesUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync();

        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task UpdateDeliverableUseCase_Should_Return_Updated()
    {
        var id = Guid.NewGuid();
        var dto = new UpdateDeliverableDto { Nombre = "Updated", Activo = false };
        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<Deliverable>()))
            .ReturnsAsync((Guid g, Deliverable d) => { d.Id = g; return d; });

        var useCase = new UpdateDeliverableUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(id, dto);

        result.Should().NotBeNull();
        result.Id.Should().Be(id);
        result.Nombre.Should().Be("Updated");
        result.Activo.Should().BeFalse();
    }

    [Fact]
    public async Task DeleteDeliverableUseCase_Should_Return_True()
    {
        var id = Guid.NewGuid();
        _mockRepository.Setup(x => x.DeleteAsync(id)).ReturnsAsync(true);
        var useCase = new DeleteDeliverableUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(id);

        result.Should().BeTrue();
    }
}
