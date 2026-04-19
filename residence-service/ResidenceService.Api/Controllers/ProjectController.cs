using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Application.use_cases.projects;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("projects")]
[Authorize]
public class ProjectController : ControllerBase
{
    private readonly CreateProjectUseCase _createUseCase;
    private readonly GetAllProjectsUseCase _getAllUseCase;
    private readonly GetProjectUseCase _getUseCase;
    private readonly UpdateProjectUseCase _updateUseCase;
    private readonly DeleteProjectUseCase _deleteUseCase;

    public ProjectController(
        CreateProjectUseCase createUseCase,
        GetAllProjectsUseCase getAllUseCase,
        GetProjectUseCase getUseCase,
        UpdateProjectUseCase updateUseCase,
        DeleteProjectUseCase deleteUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
        _getUseCase = getUseCase;
        _updateUseCase = updateUseCase;
        _deleteUseCase = deleteUseCase;
    }

    [HttpPost("register")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<Project>> Create(CreateProjectDto dto)
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
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                        ?? User.FindFirst("sub")?.Value;
            var role = User.FindFirst("role")?.Value;
            var type = User.FindFirst("type")?.Value;

            var result = await _getAllUseCase.ExecuteAsync(role, type, userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetById(Guid id)
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                        ?? User.FindFirst("sub")?.Value;
            var role = User.FindFirst("role")?.Value;
            var type = User.FindFirst("type")?.Value;

            var result = await _getUseCase.ExecuteAsync(id, role, type, userId);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<Project>> Update(Guid id, UpdateProjectDto dto)
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
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _deleteUseCase.ExecuteAsync(id);
            if (result) return NoContent();
            return BadRequest(new { message = "Could not delete project" });
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
