using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Application.dtos.deliverableSubmissions;
using ResidenceService.Api.Application.use_cases.deliverableSubmissions;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("deliverable-submissions")]
[Authorize]
public class DeliverableSubmissionController : ControllerBase
{
    private readonly CreateDeliverableSubmissionUseCase _createUseCase;
    private readonly GradeDeliverableSubmissionUseCase _gradeUseCase;

    public DeliverableSubmissionController(
        CreateDeliverableSubmissionUseCase createUseCase,
        GradeDeliverableSubmissionUseCase gradeUseCase)
    {
        _createUseCase = createUseCase;
        _gradeUseCase = gradeUseCase;
    }

    [HttpPost]
    [Authorize(Policy = "StudentOnly")]
    public async Task<ActionResult<DeliverableSubmission>> Create(CreateDeliverableSubmissionDto dto)
    {
        try
        {
            var result = await _createUseCase.ExecuteAsync(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}/grade")]
    [Authorize(Policy = "TutorOnly")]
    public async Task<ActionResult<DeliverableSubmission>> Grade(Guid id, GradeDeliverableSubmissionDto dto)
    {
        try
        {
            var result = await _gradeUseCase.ExecuteAsync(id, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // Add GetById or GetAll as needed
}
