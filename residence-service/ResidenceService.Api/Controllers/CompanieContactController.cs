using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Application.use_cases.companyContacts;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("company-contacts")]
[Authorize(Policy = "AdminOnly")]
public class CompanieContactController : ControllerBase
{
    private readonly CreateCompanieContactUseCase _createUseCase;
    private readonly GetAllCompanieContactsUseCase _getAllUseCase;
    private readonly GetCompanieContactUseCase _getByIdUseCase;
    private readonly UpdateCompanieContactUseCase _updateUseCase;
    private readonly DeleteCompanieContactUseCase _deleteUseCase;

    public CompanieContactController(
        CreateCompanieContactUseCase createUseCase,
        GetAllCompanieContactsUseCase getAllUseCase,
        GetCompanieContactUseCase getByIdUseCase,
        UpdateCompanieContactUseCase updateUseCase,
        DeleteCompanieContactUseCase deleteUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
        _getByIdUseCase = getByIdUseCase;
        _updateUseCase = updateUseCase;
        _deleteUseCase = deleteUseCase;
    }

    [HttpPost("register")]
    public async Task<ActionResult<CompanieContact>> Create(CreateCompanieContactDto dto)
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
    public async Task<ActionResult<IEnumerable<CompanieContact>>> GetAll([FromQuery] Guid? companieId)
    {
        try
        {
            var result = await _getAllUseCase.ExecuteAsync(companieId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CompanieContact>> GetById(Guid id)
    {
        try
        {
            var result = await _getByIdUseCase.ExecuteAsync(id);
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
    public async Task<ActionResult<CompanieContact>> Update(Guid id, UpdateCompanieContactDto dto)
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
            return BadRequest(new { message = "Could not delete contact" });
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
