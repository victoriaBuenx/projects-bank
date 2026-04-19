using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Application.dtos.deliverableAssignments;
using ResidenceService.Api.Application.use_cases.deliverableAssignments;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("deliverable-assignments")]
[Authorize(Policy = "AdminOnly")]
public class DeliverableAssignmentController : ControllerBase
{
    private readonly CreateDeliverableAssignmentUseCase _createUseCase;
    private readonly GetAllDeliverableAssignmentsUseCase _getAllUseCase;

    public DeliverableAssignmentController(
        CreateDeliverableAssignmentUseCase createUseCase,
        GetAllDeliverableAssignmentsUseCase getAllUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
    }

    [HttpPost]
    public async Task<ActionResult<DeliverableAssignment>> Create(CreateDeliverableAssignmentDto dto)
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DeliverableAssignment>>> GetAll([FromQuery] Guid? projectAssignmentId)
    {
        try
        {
            var result = await _getAllUseCase.ExecuteAsync(projectAssignmentId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
