using Moq;
using Xunit;
using FluentAssertions;
using ResidenceService.Api.Domain.entities;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.dtos.deliverableSubmissions;
using ResidenceService.Api.Application.use_cases.deliverableSubmissions;
using ResidenceService.Api.Domain.enums;
using System;
using System.Threading.Tasks;

namespace ResidenceService.Tests.UnitTests.Application.DeliverableSubmissions;

public class DeliverableSubmissionsUseCasesTests
{
    private readonly Mock<IDeliverableSubmissionRepository> _mockRepository;

    public DeliverableSubmissionsUseCasesTests()
    {
        _mockRepository = new Mock<IDeliverableSubmissionRepository>();
    }

    [Fact]
    public async Task CreateDeliverableSubmissionUseCase_Should_Return_Created()
    {
        var dto = new CreateDeliverableSubmissionDto
        {
            IdDeliverableAssignment = Guid.NewGuid(),
            ArchivoUrl = "http://example.com/file.pdf"
        };
        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<DeliverableSubmission>()))
            .ReturnsAsync((DeliverableSubmission d) => d);

        var useCase = new CreateDeliverableSubmissionUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(dto);

        result.Should().NotBeNull();
        result.IdDeliverableAssignment.Should().Be(dto.IdDeliverableAssignment);
        result.Estado.Should().Be(DeliverableStatus.Enviado);
    }

    [Fact]
    public async Task GradeDeliverableSubmissionUseCase_Should_Return_Updated()
    {
        var id = Guid.NewGuid();
        var dto = new GradeDeliverableSubmissionDto { Calificacion = 95, ComentarioTutor = "Perfect", Estado = DeliverableStatus.Aprobado };
        _mockRepository.Setup(x => x.UpdateAsync(id, It.IsAny<DeliverableSubmission>()))
            .ReturnsAsync((Guid g, DeliverableSubmission d) => { d.Id = g; return d; });

        var useCase = new GradeDeliverableSubmissionUseCase(_mockRepository.Object);

        var result = await useCase.ExecuteAsync(id, dto);

        result.Should().NotBeNull();
        result.Id.Should().Be(id);
        result.Calificacion.Should().Be(95);
        result.Estado.Should().Be(DeliverableStatus.Aprobado);
    }
}
