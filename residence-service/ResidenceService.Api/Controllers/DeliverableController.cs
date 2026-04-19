using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Application.dtos.deliverables;
using ResidenceService.Api.Application.use_cases.deliverables;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("deliverables")]
[Authorize(Policy = "AdminOnly")]
public class DeliverableController : ControllerBase
{
    private readonly CreateDeliverableUseCase _createUseCase;
    private readonly GetAllDeliverablesUseCase _getAllUseCase;
    private readonly GetDeliverableUseCase _getUseCase;
    private readonly UpdateDeliverableUseCase _updateUseCase;
    private readonly DeleteDeliverableUseCase _deleteUseCase;

    public DeliverableController(
        CreateDeliverableUseCase createUseCase,
        GetAllDeliverablesUseCase getAllUseCase,
        GetDeliverableUseCase getUseCase,
        UpdateDeliverableUseCase updateUseCase,
        DeleteDeliverableUseCase deleteUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
        _getUseCase = getUseCase;
        _updateUseCase = updateUseCase;
        _deleteUseCase = deleteUseCase;
    }

    [HttpPost]
    public async Task<ActionResult<Deliverable>> Create(CreateDeliverableDto dto)
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
    public async Task<ActionResult<IEnumerable<Deliverable>>> GetAll()
    {
        try
        {
            var result = await _getAllUseCase.ExecuteAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Deliverable>> GetById(Guid id)
    {
        try
        {
            var result = await _getUseCase.ExecuteAsync(id);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Deliverable>> Update(Guid id, UpdateDeliverableDto dto)
    {
        try
        {
            var result = await _updateUseCase.ExecuteAsync(id, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            await _deleteUseCase.ExecuteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
