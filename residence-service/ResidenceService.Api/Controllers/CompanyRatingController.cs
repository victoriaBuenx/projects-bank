using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Application.dtos.companyRatings;
using ResidenceService.Api.Application.use_cases.companyRatings;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("company-ratings")]
[Authorize]
public class CompanyRatingController : ControllerBase
{
    private readonly CreateCompanyRatingUseCase _createUseCase;
    private readonly GetAllCompanyRatingsUseCase _getAllUseCase;

    public CompanyRatingController(
        CreateCompanyRatingUseCase createUseCase,
        GetAllCompanyRatingsUseCase getAllUseCase)
    {
        _createUseCase = createUseCase;
        _getAllUseCase = getAllUseCase;
    }

    [HttpPost]
    [Authorize(Policy = "StudentOnly")]
    public async Task<ActionResult<CompanyRating>> Create(CreateCompanyRatingDto dto)
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                        ?? User.FindFirst("sub")?.Value;
            
            if (Guid.TryParse(userId, out Guid studentId))
            {
                var result = await _createUseCase.ExecuteAsync(dto, studentId);
                return Ok(result);
            }
            return BadRequest(new { message = "Invalid student identity" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompanyRating>>> GetAll([FromQuery] Guid? companieId)
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
}
