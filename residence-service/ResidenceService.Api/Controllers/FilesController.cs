using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Domain.interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class FilesController : ControllerBase
{
    private readonly IMinioService _minioService;

    public FilesController(IMinioService minioService)
    {
        _minioService = minioService;
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        Console.WriteLine($"Files count: {Request.Form.Files.Count}");
        Console.WriteLine($"Form keys: {string.Join(", ", Request.Form.Keys)}");
        Console.WriteLine($"File is null: {file == null}");

        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var url = await _minioService.UploadFileAsync(stream, fileName, file.ContentType);

            return Ok(new { url });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error uploading file", error = ex.Message });
        }
    }
}
