using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ResidenceService.Api.Application.dtos.projectAssignments;
using ResidenceService.Api.Application.use_cases.projectAssignments;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("project-assignments")]
[Authorize(Policy = "AdminOnly")]
public class ProjectAssignmentController : ControllerBase
{
    private readonly CreateProjectAssignmentUseCase _createUseCase;
    private readonly GetAllProjectAssignmentsUseCase _getAllUseCase;
    private readonly GetProjectAssignmentUseCase _getUseCase;
    private readonly UpdateProjectAssignmentUseCase _updateUseCase;
    private readonly DeleteProjectAssignmentUseCase _deleteUseCase;

    public ProjectAssignmentController(
        CreateProjectAssignmentUseCase createUseCase,
        GetAllProjectAssignmentsUseCase getAllUseCase,
        GetProjectAssignmentUseCase getUseCase,
        UpdateProjectAssignmentUseCase updateUseCase,
        DeleteProjectAssignmentUseCase deleteUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
        _getUseCase = getUseCase;
        _updateUseCase = updateUseCase;
        _deleteUseCase = deleteUseCase;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ProjectAssignment>> Create(CreateProjectAssignmentDto dto)
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
    public async Task<ActionResult<IEnumerable<ProjectAssignment>>> GetAll()
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
    public async Task<ActionResult<ProjectAssignment>> GetById(Guid id)
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
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectAssignment>> Update(Guid id, UpdateProjectAssignmentDto dto)
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
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _deleteUseCase.ExecuteAsync(id);
            if (result) return NoContent();
            return BadRequest(new { message = "Could not delete assignment" });
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
}
