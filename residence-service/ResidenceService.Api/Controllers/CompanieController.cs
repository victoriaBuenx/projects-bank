using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Application.use_cases.companies;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("companies")]
[Authorize(Policy = "AdminOnly")]
public class CompanieController : ControllerBase
{
    private readonly CreateCompanieUseCase _createCompanieUseCase;
    private readonly GetAllCompaniesUseCase _getAllCompaniesUseCase;
    private readonly GetCompanieUseCase _getCompanieUseCase;
    private readonly UpdateCompanieUseCase _updateCompanieUseCase;
    private readonly DeleteCompanieUseCase _deleteCompanieUseCase;

    public CompanieController(
        CreateCompanieUseCase createCompanieUseCase,
        GetAllCompaniesUseCase getAllCompaniesUseCase,
        GetCompanieUseCase getCompanieUseCase,
        UpdateCompanieUseCase updateCompanieUseCase,
        DeleteCompanieUseCase deleteCompanieUseCase)
    {
        _createCompanieUseCase = createCompanieUseCase;
        _getAllCompaniesUseCase = getAllCompaniesUseCase;
        _getCompanieUseCase = getCompanieUseCase;
        _updateCompanieUseCase = updateCompanieUseCase;
        _deleteCompanieUseCase = deleteCompanieUseCase;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Companie>> Create(CreateCompanieDto dto)
    {
        try
        {
            var result = await _createCompanieUseCase.ExecuteAsync(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Companie>>> GetAll()
    {
        try
        {
            var result = await _getAllCompaniesUseCase.ExecuteAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Companie>> GetById(Guid id)
    {
        try
        {
            var result = await _getCompanieUseCase.ExecuteAsync(id);
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
    public async Task<ActionResult<Companie>> Update(Guid id, UpdateCompanieDto dto)
    {
        try
        {
            var result = await _updateCompanieUseCase.ExecuteAsync(id, dto);
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
            var result = await _deleteCompanieUseCase.ExecuteAsync(id);
            if (result) return NoContent();
            return BadRequest(new { message = "Could not delete companie" });
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
