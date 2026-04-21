using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverableAssignments;
using ResidenceService.Api.Application.use_cases.deliverableAssignments;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.DeliverableAssignments;

public class DeliverableAssignmentsUseCasesTests
{
    private readonly Mock<IDeliverableAssignmentRepository> _mockRepository;

    public DeliverableAssignmentsUseCasesTests()
    {
        _mockRepository = new Mock<IDeliverableAssignmentRepository>();
    }

    [Fact]
    public async Task CreateDeliverableAssignmentUseCase_Should_Return_Created()
    {
        var dto = new CreateDeliverableAssignmentDto
        {
            IdDeliverable = Guid.NewGuid(),
            IdProjectAssignment = Guid.NewGuid()
        };
        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<DeliverableAssignment>())).ReturnsAsync((DeliverableAssignment d) => d);

        var useCase = new CreateDeliverableAssignmentUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(dto);

        result.Should().NotBeNull();
        result.IdDeliverable.Should().Be(dto.IdDeliverable);
    }

    [Fact]
    public async Task GetAllDeliverableAssignmentsUseCase_NoId_Should_Return_All()
    {
        var list = new List<DeliverableAssignment> { new DeliverableAssignment { Id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(list);

        var useCase = new GetAllDeliverableAssignmentsUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(null);

        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetAllDeliverableAssignmentsUseCase_WithId_Should_Return_Filtered()
    {
        var id = Guid.NewGuid();
        var list = new List<DeliverableAssignment> { new DeliverableAssignment { Id = Guid.NewGuid() } };
        _mockRepository.Setup(x => x.GetByProjectAssignmentIdAsync(id)).ReturnsAsync(list);

        var useCase = new GetAllDeliverableAssignmentsUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(id);

        result.Should().HaveCount(1);
    }
}
